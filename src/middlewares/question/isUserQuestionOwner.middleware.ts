import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { IQuestion, IRequestExtended, IUser } from '../../interfaces';

export const isUserQuestionOwnerMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.user as IUser;
    const { user_id } = req.question as IQuestion;

    if (user_id !== _id) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.FORBIDDEN, 'Its not your question'));
    }

    next();
  } catch (e) {
    return next(e);
  }
};
