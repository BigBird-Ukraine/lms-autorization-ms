import { NextFunction, Response } from 'express';
import { ResponseStatusCodesEnum, UserStatusEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended, IUser } from '../../interfaces';

export const checkIsUserPending = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const { status_id } = req.user as IUser;

    if (status_id === UserStatusEnum.PENDING) {
      return next (new ErrorHandler(
        ResponseStatusCodesEnum.FORBIDDEN,
        errors.FORBIDDEN_USER_PENDING.message,
        errors.FORBIDDEN_USER_PENDING.code));
    }

    next();
  } catch (e) {
    next(e);
  }
};
