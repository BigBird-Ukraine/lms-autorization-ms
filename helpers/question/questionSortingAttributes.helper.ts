import { NextFunction } from 'express';
import { ResponseStatusCodesEnum } from '../../constants/enums';
import { ErrorHandler, errors } from '../../errors';
import { IQuestion } from '../../interfaces';

export const questionSortingAttributes = (sort: keyof IQuestion, next: NextFunction) => {
    const sortingAttributes: Array<keyof IQuestion> = ['group', 'level', 'subject', 'tags', '_id'];

    if (!sortingAttributes.includes(sort)) {
        return next(new ErrorHandler(
            ResponseStatusCodesEnum.BAD_REQUEST,
            errors.BAD_REQUEST_WRONG_SORTING_PARAMS.message,
            errors.BAD_REQUEST_WRONG_SORTING_PARAMS.code));
    }

};
