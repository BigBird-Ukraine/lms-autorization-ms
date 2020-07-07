import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { lessonValidator } from '../../../validators';

export const isLessonValid = async (req: Request, res: Response, next: NextFunction) => {
    const lessonValue = req.body;
    const {error} = Joi.validate(lessonValue, lessonValidator);

    if (error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }

    next();
};
