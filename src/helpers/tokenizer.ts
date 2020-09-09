import * as jwt from 'jsonwebtoken';

import { config } from '../configs';
import { ResponseStatusCodesEnum, StatusesEnum, UserActionEnum } from '../constants';
import { ErrorHandler } from '../errors';

export const tokenizer = (method: number): any => {

  switch (method) {
    case UserActionEnum.AUTH:
      const accessToken = jwt.sign({}, config.JWT_SECRET, {expiresIn: config.ACCESS_TOKEN_LIFETIME});
      const refreshToken = jwt.sign({}, config.JWT_REFRESH_SECRET, {expiresIn: config.REFRESH_TOKEN_LIFETIME});

      return {accessToken, refreshToken};
    case UserActionEnum.CONFIRM_EMAIL:

      return jwt.sign({}, config.JWT_CONFIRM_EMAIL_SECRET, {expiresIn: config.CONFIRM_EMAIL_TOKEN_LIFETIME});
    case UserActionEnum.RESET_PASS:

      return jwt.sign({}, config.JWT_EMAIL_VALIDATION_SECRET, {expiresIn: config.EMAIL_VALIDATION_TOKEN_LIFETIME});
    case UserActionEnum.CHANGE_PASSWORD:

      return jwt.sign({}, config.JWT_EMAIL_VALIDATION_SECRET, {expiresIn: config.EMAIL_VALIDATION_TOKEN_LIFETIME});
    default:
      throw new ErrorHandler(ResponseStatusCodesEnum.SERVER_ERROR, StatusesEnum.WRONG_ACTION_TYPE);
  }
};
