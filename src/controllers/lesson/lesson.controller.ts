import { NextFunction, Request, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { calculationPageCount, lessonSortingAttributes, regexFilterParams } from '../../helpers';
import { ILesson, IRequestExtended, IUser } from '../../interfaces';
import { lessonService } from '../../services';

class LessonController {

  async createLesson(req: IRequestExtended, res: Response, next: NextFunction) {
    const lessonValue = req.body;
    const {_id} = req.user as IUser;

    await lessonService.createLesson({...lessonValue, user_id: _id});

    res.status(ResponseStatusCodesEnum.CREATED).end();
  }

  async getLessons(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        limit = 20,
        offset = 0,
        sort = '_id',
        order,
        ...filter
      } = req.query;

      lessonSortingAttributes(sort);
      const updatedFilterParams = regexFilterParams(filter);

      const lesson = await lessonService.getLessons(+limit, +offset, sort, order, filter);
      const count = await lessonService.getSizeOfAll(updatedFilterParams) as number;

      res.json({
        data: {
          lesson,
          count,
          pageCount: calculationPageCount(count, limit)
        }
      });
    } catch (e) {
      next(e);
    }
  }

  async getLessonById(req: IRequestExtended, res: Response, next: NextFunction) {
    const lesson = req.lesson as ILesson;

    res.json({data: lesson});
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

    const updatedLesson = await lessonService.editLessonById(lesson_id, updatingData);

    res.json({
      data: updatedLesson
    });
  }

  async addQuestionToLesson(req: Request, res: Response, next: NextFunction) {
    const {lesson_id} = req.params;
    const {NewQuestions_id} = req.body;

    const updatedLesson = await lessonService.addQuestionsToLesson(lesson_id, NewQuestions_id);

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
