import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { IRequestExtended } from '../../interfaces';
import { questionService } from '../../services';

export const isQuestionPresentMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const { question_id } = req.params;
    const question = await questionService.getQuestionById(question_id);

    if (!question) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, 'Question not found'));
    }

    req.question = question;

    next();
  } catch (e) {
    next(e);
  }
};
