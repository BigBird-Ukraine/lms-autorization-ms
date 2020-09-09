import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { confirmTokenDataValidator } from '../../../validators/user';

export const isConfirmDataValid = async (req: Request, res: Response, next: NextFunction) => {
    const confirmToken = req.body;

    const {error} = Joi.validate(confirmToken, confirmTokenDataValidator);

    if (error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }

    next();
};
