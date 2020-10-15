import { Socket } from 'socket.io';

import { roomController } from '../../../controllers';
import { User } from '../../../database/models';
import { errorHandlerSockets } from '../../../errors';
import { socketsMiddlewaresManager } from '../../../helpers';
import { io } from '../../../index';
import { IResponseSocket, ITableEvent } from '../../../interfaces';
import {
    isRentOwnerSockets,
    isRoomPresentMiddlewareSockets
} from '../../../middlewares';

export const cancelBook = async (socket: Socket, event: ITableEvent) => {
    const middlewares = [isRoomPresentMiddlewareSockets, isRentOwnerSockets];
    const errorStatus: IResponseSocket | undefined = await socketsMiddlewaresManager(middlewares, socket, event);

    const currentUser = await User.findById(socket.handshake.query.user._id) as any;

    if (errorStatus?.status) {
        errorHandlerSockets(errorStatus.message, errorStatus.code, socket);
    } else {
        await roomController.deleteBookedUser(event.room_id, event.rent_start, event.table_number, currentUser);
        io.in(event.room).emit('cancel_book', event);
    }
};
