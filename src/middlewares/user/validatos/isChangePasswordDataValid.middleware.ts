import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { IChangePassword } from '../../../interfaces';
import { changePasswordDataValidator } from '../../../validators';

export const isChangePasswordDataValid = async (req: Request, res: Response, next: NextFunction) => {
    const passwords = req.body as IChangePassword;

    const {error} = Joi.validate(passwords, changePasswordDataValidator);

    if (error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }
    next();
};
