import { NextFunction, Response } from 'express';
import * as Joi from 'joi';
import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler } from '../../errors';
import { IRequestExtended, IUser } from '../../interfaces';
import { userPasswordValidator } from '../../validators/user';

export const isPasswordValid = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  const {password} = req.body as IUser;
  const {error} = Joi.validate({password}, userPasswordValidator);

  if (error) {
    return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
