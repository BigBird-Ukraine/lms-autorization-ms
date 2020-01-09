import { NextFunction, Response } from 'express';
import { ResponseStatusCodesEnum, UserStatusEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended, IUser } from '../../interfaces';

export const checkIsUserBlocked = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const { status_id } = req.user as IUser;

    if (status_id === UserStatusEnum.BLOCKED) {
      return next (new ErrorHandler(
        ResponseStatusCodesEnum.FORBIDDEN,
        errors.FORBIDDEN_USER_BLOCKED.message,
        errors.FORBIDDEN_USER_BLOCKED.code));
    }

    next();
  } catch (e) {
    next(e);
  }
};
