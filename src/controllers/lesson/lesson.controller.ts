import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { ILesson, IRequestExtended, IUser } from '../../interfaces';
import { lessonService } from '../../services';
import { lessonFilterParamtresValidator, lessonValidator } from '../../validators';

const lessonSortingAttributes: Array<keyof ILesson> = ['number', 'label', 'tags', '_id'];
class LessonController {

  async createLesson(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const lessonValue = req.body;
      const {_id} = req.user as IUser;

      const lessonValidity = Joi.validate(lessonValue, lessonValidator);

      if (lessonValidity.error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, lessonValidity.error.details[0].message));
      }

      await lessonService.createLesson({...lessonValue, user_id: _id});

      res.status(ResponseStatusCodesEnum.CREATED).end();
    } catch (e) {
      next(e);
    }
  }

  async getLesson(req: Request, res: Response, next: NextFunction) {
    try {
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

    } catch (e) {
      next(e);
    }
  }

  async getMyLesson(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { _id } = req.user as IUser;

      const lesson = await lessonService.getMyLesson(_id);

      res.json({
        data: {
          lesson
        }
      });
    } catch (e) {
      next(e);
    }
  }
}
export const lessonController = new LessonController();
