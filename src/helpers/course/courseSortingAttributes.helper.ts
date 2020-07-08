import {ResponseStatusCodesEnum, StatusesEnum} from '../../constants/enums';
import {ErrorHandler} from '../../errors';
import {ICourse} from '../../interfaces';

export const courseSortingAttributes = (sort: keyof ICourse) => {
    const sortingAttributes: Array<keyof ICourse> = ['_id', 'label', 'level', 'modules_list'];

    if (!sortingAttributes.includes(sort)) {
        throw new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, StatusesEnum.CANT_SORT_BY_THIS_PARAM);
    }
};
