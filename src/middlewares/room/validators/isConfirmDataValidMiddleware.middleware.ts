import { NextFunction, Request, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { IIpAddress } from '../../../interfaces';
import { isConfirmDataValid } from '../../../validators';

export const isConfirmDataValidMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as IIpAddress;

  const {error} = isConfirmDataValid.validate(body);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
