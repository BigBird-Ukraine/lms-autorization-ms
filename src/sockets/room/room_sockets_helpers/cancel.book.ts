import { Socket } from 'socket.io';

import { roomController } from '../../../controllers';
import { errorHandlerSockets } from '../../../errors';
import { socketsMiddlewaresManager } from '../../../helpers';
import { IResponseSocket, ITableEvent } from '../../../interfaces';
import {
    isRentOwnerSockets,
    isRoomPresentMiddlewareSockets
} from '../../../middlewares';

export const cancelBook = async (socket: Socket, event: ITableEvent) => {
    const middlewares = [isRoomPresentMiddlewareSockets, isRentOwnerSockets];
    const errorStatus: IResponseSocket | undefined = await socketsMiddlewaresManager(middlewares, socket, event);

    if (errorStatus?.status) {
        errorHandlerSockets(errorStatus.message, errorStatus.code, socket);
    } else {
        await roomController.deleteBookedUser(event.room_id, event.rent_id);
        socket.broadcast.to(event.room).emit('cancel_book', event);
    }
};
