import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../interfaces';
import { questionService } from '../../services';

export const isQuestionPresentMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {

  const {question_id} = req.params;
  const question = await questionService.getQuestionById(question_id);

  if (!question) {
    return next(new ErrorHandler(
      ResponseStatusCodesEnum.NOT_FOUND,
      errors.NOT_FOUND_QUESTION_NOT_PRESENT.message,
      errors.NOT_FOUND_QUESTION_NOT_PRESENT.code));
  }

  req.question = question;

  next();
};
