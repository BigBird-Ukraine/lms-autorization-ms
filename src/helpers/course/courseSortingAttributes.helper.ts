import { NextFunction } from 'express';
import { ResponseStatusCodesEnum, StatusesEnum } from '../../constants/enums';
import { ErrorHandler } from '../../errors';
import { ICourse } from '../../interfaces';

export const courseSortingAttributes = (sort: keyof ICourse, next: NextFunction) => {
    const sortingAttributes: Array<keyof ICourse> = ['_id', 'label', 'level', 'modules_list'];

    if (!sortingAttributes.includes(sort)) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, StatusesEnum.CANT_SORT_BY_THIS_PARAM));
    }
};
