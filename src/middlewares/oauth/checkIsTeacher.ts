import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum, UserRoleEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended, IUser } from '../../interfaces';

export const checkIsTeacher = async (req: IRequestExtended, res: Response, next: NextFunction) => {

  const {role_id} = req.user as IUser;

  if (role_id === UserRoleEnum.STUDENT) {
    return next(
      new ErrorHandler(
        ResponseStatusCodesEnum.FORBIDDEN,
        errors.FORBIDDEN_NO_PERMISSIONS.message,
        errors.FORBIDDEN_NO_PERMISSIONS.code
      ));
  }
  next();
};
