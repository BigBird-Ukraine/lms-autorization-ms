import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { lessonIdValidator } from '../../../validators';

export const isLessonIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const {error} = Joi.validate(req.params, lessonIdValidator);

    if (error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }

    next();
};
