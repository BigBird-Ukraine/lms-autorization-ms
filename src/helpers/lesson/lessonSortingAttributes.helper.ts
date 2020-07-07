import { NextFunction } from 'express';
import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { ILesson } from '../../interfaces';

export const lessonSortingAttributes = (sort: keyof ILesson, next: NextFunction) => {
    const sortingAttributes: Array<keyof ILesson> = ['number', 'label', 'tags', '_id'];

    if (!sortingAttributes.includes(sort)) {
        return next(new ErrorHandler(
            ResponseStatusCodesEnum.BAD_REQUEST,
            errors.BAD_REQUEST_WRONG_SORTING_PARAMS.message,
            errors.BAD_REQUEST_WRONG_SORTING_PARAMS.code));
    }
};
