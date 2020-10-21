import { Socket } from 'socket.io';

import { ResponseStatusCodesEnum, UserStatusEnum } from '../../../constants/enums';
import { User } from '../../../database/models';
import { errors } from '../../../errors';
import { ITableEvent, IUser } from '../../../interfaces';

export const isUserBookingBaned = async (socket: Socket, events: ITableEvent) => {
    const {user} = socket.handshake.query;

    const currentUser = await User.findById(user?._id) as IUser;
    const {booking_ban_status} = currentUser as IUser;

    if (booking_ban_status.status === UserStatusEnum.BOOKING_BAN) {
        return {
            status: ResponseStatusCodesEnum.FORBIDDEN,
            message: errors.FORBIDDEN_USER_BOOKING.message,
            code: errors.FORBIDDEN_USER_BOOKING.code
        };
    }

    return socket.handshake.query.user = currentUser;
};
