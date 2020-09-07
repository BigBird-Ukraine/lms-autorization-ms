import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { config } from '../../configs';
import { ResponseStatusCodesEnum, StatusesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../interfaces';
import { userService } from '../../services';

export const checkConfirmMailTokenPresent = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  const {confirmMailToken} = req.body;

  jwt.verify(confirmMailToken, config.JWT_CONFIRM_EMAIL_SECRET, (err: jwt.VerifyErrors) => {
    if (err) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, StatusesEnum.INVALID_TOKEN));
    }
  });

  const isUserPresent = await userService.getUserByParams({confirm_token: confirmMailToken});

  if (!isUserPresent) {
    return next(
      new ErrorHandler(
        ResponseStatusCodesEnum.BAD_REQUEST,
        errors.NOT_FOUND_USER_NOT_PRESENT.message,
        errors.NOT_FOUND_USER_NOT_PRESENT.code
      )
    );
  }

  req.user = isUserPresent;

  next();
};
