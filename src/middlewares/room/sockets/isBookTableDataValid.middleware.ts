import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { errors } from '../../../errors';
import { IBookUser } from '../../../interfaces';
import { tableBookValidator } from '../../../validators/room';

export const isBookTableDataValid = async (data: IBookUser) => {
    const {error} = Joi.validate(data, tableBookValidator);

    if (error) {
        return {
            status: ResponseStatusCodesEnum.BAD_REQUEST,
            code: errors.BAD_REQUEST_WRONG_PARAMS.code,
            message: errors.BAD_REQUEST_WRONG_PARAMS.message};

    }
};
