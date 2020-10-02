import * as Joi from 'joi';
import { Socket } from 'socket.io';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { errors } from '../../../errors';
import { ITableEvent } from '../../../interfaces';
import { tableBookValidator } from '../../../validators/room';

export const isBookTableDataValid = async (socket: Socket, events: ITableEvent) => {
    const {error} = Joi.validate(events.bookUserTable, tableBookValidator);

    if (error) {
        return {
            status: ResponseStatusCodesEnum.BAD_REQUEST,
            code: errors.BAD_REQUEST_WRONG_PARAMS.code,
            message: errors.BAD_REQUEST_WRONG_PARAMS.message};

    }

    return socket;
};
