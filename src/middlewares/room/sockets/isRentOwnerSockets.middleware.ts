import { Socket } from 'socket.io';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { errors } from '../../../errors';
import { IBookUser, ITableEvent } from '../../../interfaces';

export const isRentOwnerSockets = (socket: Socket, events: ITableEvent) => {
    const {user, room} = socket.handshake.query;
    const {rent_start, table_number} = events;
    const rentS = new Date(rent_start) ;

    const status = room[0].booked_users.find((bu: IBookUser) => {
        return     bu.user_id.toString() === user._id.toString() &&
                   bu.table_number === table_number &&
                   bu.rent_start.getTime() === rentS.getTime();
        }
    );

    if (!status) {
        return {
            status: ResponseStatusCodesEnum.FORBIDDEN,
            message: errors.FORBIDDEN_NOT_YOUR_PLACE.message,
            code: errors.FORBIDDEN_NOT_YOUR_PLACE.code
        };
    }

    return socket;
};
