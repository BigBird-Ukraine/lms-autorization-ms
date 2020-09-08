import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { config } from '../../configs';
import { ResponseStatusCodesEnum, StatusesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';

import { IRequestExtended } from '../../interfaces';
import { userService } from '../../services/user';

export const checkResetPasswordTokenMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  try {
    const {token} = req.params;

    jwt.verify(token, config.JWT_EMAIL_VALIDATION_SECRET, (err: jwt.VerifyErrors) => {
      if (err) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, StatusesEnum.INVALID_TOKEN));
      }
    });

    const isUserPresent = await userService.getUserByParams({reset_token: token});

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
  } catch (e) {
    next(e);
  }
};
