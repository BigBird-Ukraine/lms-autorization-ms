import { NextFunction, Request, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import {
  calculationPageCount,
  checkPresentPassedQuestions, questionCorrectAnswersCount,
  questionSortingAttributes,
  regexFilterParams
} from '../../helpers';
import { IAnswers, IPassedTest, IRequestExtended, IUser } from '../../interfaces';
import { lessonService, questionService, userService } from '../../services';

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

      questionSortingAttributes(sort);
      const updatedFilterParams = regexFilterParams(filter);

      const questions = await questionService.getQuestions(0, +limit, +offset, sort, order, filter);
      const questionAnswers = await questionService.getQuestions(1, +limit, +offset, sort, order, filter) as IAnswers[];

      const maxMark = await questionCorrectAnswersCount(questionAnswers);
      const count = await questionService.getSizeOfAll(updatedFilterParams) as number;

      res.json({
        data: {
          questions,
          count,
          maxMark: maxMark * 10,
          pageCount: calculationPageCount(count, limit)
        }
      });
    } catch (e) {
      next(e);
    }
  }

  async createQuestion(req: IRequestExtended, res: Response, next: NextFunction) {
    const questionValue = req.body;
    const {_id} = req.user as IUser;

    await questionService.createQuestion({...questionValue, user_id: _id});

    res.status(ResponseStatusCodesEnum.CREATED).end();
  }

  async updateQuestion(req: IRequestExtended, res: Response, next: NextFunction) {
    await questionService.updateQuestion(req.body);
    await lessonService.resetLastValidLessons(req.body.lesson_id);

    res.status(ResponseStatusCodesEnum.CREATED).end();
  }

  async getMyQuestions(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id} = req.user as IUser;
    const {limit = 20, offset = 0} = req.query;

    const questions = await questionService.getMyQuestion(_id, +limit, +offset);

    res.json({
      data: {
        questions,
        count: questions.length,
        pageCount: calculationPageCount(questions.length, limit)
      }
    });
  }

  async deleteQuestion(req: IRequestExtended, res: Response, next: NextFunction) {
    const {question_id} = req.params;

    const {lesson_id} = await questionService.getQuestionById(question_id) as any;
    await lessonService.resetLastValidLessons(lesson_id);
    await questionService.deleteQuestionById(question_id);

    res.end();
  }

  async addFilteredTestResult(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id} = req.user as IUser;
    const pt = req.passed_test as IPassedTest;

    const passed_questions_id = await checkPresentPassedQuestions(req.body.questions) as any;

    await userService.addPassedTest(_id, {passed_questions_id, result: pt.result, max_mark: pt.max_mark});

    res.json(pt.result);
  }
}

export const questionController = new QuestionController();
