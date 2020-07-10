import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { IUser } from '../../../interfaces';
import { updateDataValidator } from '../../../validators';

export const isUpdatedUserDataValid = async (req: Request, res: Response, next: NextFunction) => {
    const updateInfo = req.body as IUser;
    const {error} = Joi.validate(updateInfo, updateDataValidator);

    if (error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }
    next();
};
