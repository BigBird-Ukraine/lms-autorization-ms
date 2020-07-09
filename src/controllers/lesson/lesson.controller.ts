import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { ILesson, IRequestExtended, IUser } from '../../interfaces';
import { lessonService } from '../../services';
import { addQuestionToLessonValidator, lessonFilterParamtresValidator, lessonUpdateDataValidator, lessonValidator } from '../../validators';

const lessonSortingAttributes: Array<keyof ILesson> = ['number', 'label', 'tags', '_id'];

class LessonController {

  async createLesson(req: IRequestExtended, res: Response, next: NextFunction) {

    const lessonValue = req.body;
    const {_id} = req.user as IUser;

    const lessonValidity = Joi.validate(lessonValue, lessonValidator);

    if (lessonValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, lessonValidity.error.details[0].message));
    }

    await lessonService.createLesson({...lessonValue, user_id: _id});

    res.status(ResponseStatusCodesEnum.CREATED).end();
  }

  getLessonById(req: IRequestExtended, res: Response, next: NextFunction) {

    const lesson = req.lesson as ILesson;

    res.json({data: lesson});
  }

  async getLesson(req: Request, res: Response, next: NextFunction) {

    const {
      limit = 20,
      offset = 0,
      sort = '_id',
      order,
      ...filter
    } = req.query;

    const filterValidity = Joi.validate(filter, lessonFilterParamtresValidator);

    if (filterValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, filterValidity.error.details[0].message));
    }

    if (!lessonSortingAttributes.includes(sort)) {
      return next(new ErrorHandler(
        ResponseStatusCodesEnum.BAD_REQUEST,
        errors.BAD_REQUEST_WRONG_SORTING_PARAMS.message,
        errors.BAD_REQUEST_WRONG_SORTING_PARAMS.code));
    }

    const lesson = await lessonService.getLessons(+limit, +offset, sort, order, filter);
    const count = lesson.length;
    const pageCount = Math.ceil(count / limit);

    res.json({
      data: {
        lesson,
        count,
        pageCount
      }
    });
  }

  async getMyLesson(req: IRequestExtended, res: Response, next: NextFunction) {

    const {_id} = req.user as IUser;

    const lesson = await lessonService.getMyLesson(_id);

    res.json({
      data: {
        lesson
      }
    });
  }

  async updateMyLesson(req: Request, res: Response, next: NextFunction) {

    const {lesson_id} = req.params;
    const updatingData = req.body as Partial<ILesson>;

    const dataValidity = Joi.validate(updatingData, lessonUpdateDataValidator);

    if (dataValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, dataValidity.error.details[0].message));
    }

    await lessonService.editLessonById(lesson_id, updatingData);

    const updatedLesson = await lessonService.getLessonByID(lesson_id);

    res.json({
      data: updatedLesson
    });
  }

  async addQuestionToLesson(req: Request, res: Response, next: NextFunction) {

    const {lesson_id} = req.params;

    const {NewQuestions_id} = req.body;

    const qusetionIdValidity = Joi.validate(NewQuestions_id, addQuestionToLessonValidator);

    if (qusetionIdValidity.error) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, qusetionIdValidity.error.details[0].message));
    }

    for (const Question of NewQuestions_id) {
      await lessonService.addQuestionsToLesson(lesson_id, Question);
    }

    const updatedLesson = await lessonService.getLessonByID(lesson_id);

    res.json({
      data: updatedLesson
    });
  }

  async generateTestByLessonId(req: Request, res: Response, next: NextFunction) {

    const {lesson_id} = req.params;

    const questions_id = await lessonService.getQuestionsForTestByLessonId(lesson_id);

    res.json({data: questions_id});
  }

  async deleteMyLesson(req: IRequestExtended, res: Response, next: NextFunction) {

    const {lesson_id} = req.params;

    await lessonService.deleteLessonById(lesson_id);

    res.end();

  }
}

export const lessonController = new LessonController();
