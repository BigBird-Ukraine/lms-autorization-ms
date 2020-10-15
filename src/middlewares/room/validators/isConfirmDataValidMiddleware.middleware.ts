import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { IRoom } from '../../../interfaces';
import { isConfirmDataValid } from '../../../validators';

export const isConfirmDataValidMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as Partial<IRoom>;
  console.log(body);

  const {error} = Joi.validate(body, isConfirmDataValid);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
