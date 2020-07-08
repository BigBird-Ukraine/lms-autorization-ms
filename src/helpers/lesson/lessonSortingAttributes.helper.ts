import {ResponseStatusCodesEnum, StatusesEnum} from '../../constants/enums';
import {ErrorHandler} from '../../errors';
import {ILesson} from '../../interfaces';

export const lessonSortingAttributes = (sort: keyof ILesson) => {
    const sortingAttributes: Array<keyof ILesson> = ['number', 'label', 'tags', '_id'];

    if (!sortingAttributes.includes(sort)) {
        throw new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, StatusesEnum.CANT_SORT_BY_THIS_PARAM);
    }
};
