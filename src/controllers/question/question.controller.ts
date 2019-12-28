import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum, UserRoleEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IQuestion, IRequestExtended, IUser } from '../../interfaces';
import { questionService } from '../../services';
import { filterParametresValidator, insertedQuestionValidator } from '../../validators';

const questionSortingAttributes: Array<keyof IQuestion> = ['group', 'level', 'subject', 'tags', '_id'];

class QuestionController {
  async getQuestions(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        limit = 20,
        offset = 0,
        sort = '_id',
        order,
        ...filter
      } = req.query;

      const filterValidity = Joi.validate(filter, filterParametresValidator);

      if (filterValidity.error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, filterValidity.error.details[0].message));
      }

      if (!questionSortingAttributes.includes(sort)) {
        return next(new ErrorHandler(
          ResponseStatusCodesEnum.BAD_REQUEST,
          errors.BAD_REQUEST_WRONG_SORTING_PARAMS.message,
          errors.BAD_REQUEST_WRONG_SORTING_PARAMS.code));
      }

      const questions = await questionService.getQuestions(+limit, +offset, sort, order, filter);
      const count = questions.length;
      const pageCount = Math.ceil(count / limit); // todo method to find all records

      res.json({
        data: {
          questions,
          count,
          pageCount
        }
      });
    } catch (e) {
      next(e);
    }
  }

  async createQuestion(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const questionValue = req.body;
      const { _id, role_id } = req.user as IUser;

      if (role_id === UserRoleEnum.STUDENT) {
        return next(
          new ErrorHandler(
            ResponseStatusCodesEnum.FORBIDDEN,
            'You have no permissions to add question'
          )
        );
      }

      const questionValidity = Joi.validate(questionValue, insertedQuestionValidator);

      if (questionValidity.error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, questionValidity.error.details[0].message));
      }

      await questionService.createQuestion({ ...questionValue, user_id: _id });

      res.status(ResponseStatusCodesEnum.CREATED).end();
    } catch (e) {
      next(e);
    }
  }

  async getMyQuestions(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { _id } = req.user as IUser;
      const { limit = 20, offset = 20 } = req.query;
      const questions = await questionService.getMyQuestion(_id, +limit, +offset);
      const count = questions.length;
      const pageCount = Math.ceil(count / limit);

      res.json({
        data: {
          questions,
          count,
          pageCount
        }
      });
    } catch (e) {
      next(e);
    }
  }

  async deleteQuestion(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { question_id } = req.params;

      await questionService.deleteQuestionById(question_id);

      res.end();
    } catch (e) {
      next(e);
    }
  }
}

export const questionController = new QuestionController();
