import { NextFunction, Response } from 'express';
import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';

import { IComment, IRequestExtended, IUser } from '../../interfaces';

export const isCommentOwnerMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const {_id} = req.user as IUser;
    const {user_id} = req.comment as IComment;

    if (user_id.toString() !== _id.toString()) {
      return next(new ErrorHandler(
        ResponseStatusCodesEnum.FORBIDDEN,
        errors.FORBIDDEN_NOT_YOUR_COMMENT.message,
        errors.FORBIDDEN_NOT_YOUR_COMMENT.code
      ));
    }

    next();
  } catch (e) {
    return next(e);
  }
};
