import { NextFunction, Response } from 'express';
import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';

import { ILesson, IRequestExtended, IUser } from '../../interfaces';

export const isLessonOwnerMiddleware  = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.user as IUser;
    const { user_id } = req.lesson as ILesson;

    if (user_id.toString() !== _id.toString()) {
      return next(new ErrorHandler(
        ResponseStatusCodesEnum.FORBIDDEN,
        errors.FORBIDDEN_NOT_YOUR_LESSON.message,
        errors.FORBIDDEN_NOT_YOUR_LESSON.code
      ));
    }

    next();
  } catch (e) {
   return  next(e);
  }
};
