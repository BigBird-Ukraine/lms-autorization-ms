import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../interfaces';
import { courseService } from '../../services';

export const isCoursePresent = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    const {course_id} = req.params;

    const course = await courseService.getCourseByID(course_id);

    if (!course) {
        return next(new ErrorHandler(
            ResponseStatusCodesEnum.NOT_FOUND,
            errors.NOT_FOUND_COURSE_NOT_PRESENT.message,
            errors.NOT_FOUND_COURSE_NOT_PRESENT.code
        ));
    }

    req.course = course;

    next();
};
