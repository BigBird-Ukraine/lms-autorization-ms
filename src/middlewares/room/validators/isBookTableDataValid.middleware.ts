import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { IBookUser, IRequestExtended } from '../../../interfaces';
import { tableBookValidator } from '../../../validators/room';

export const isBookTableDataValid = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.body.user_id = req.user?._id.toString();
    req.body.table_number = req.params.table_number;

    const tableBookDate = req.body as IBookUser;

    const {error} = Joi.validate(tableBookDate, tableBookValidator);

    if (error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }

    next();
};
