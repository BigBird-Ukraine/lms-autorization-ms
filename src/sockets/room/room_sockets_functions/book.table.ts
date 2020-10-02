import { Socket } from 'socket.io';

import { roomController, userController } from '../../../controllers';
import { errorHandlerSockets } from '../../../errors';
import { socketsMiddlewaresManager } from '../../../helpers';
import { IResponseSocket, ITableEvent } from '../../../interfaces';
import { isBookTableDataValid, isRoomPresentMiddlewareSockets, isTableOccupiedMiddleware } from '../../../middlewares';

export const bookTable = async (socket: Socket, event: ITableEvent) => {
    const errorStatus: IResponseSocket | undefined = await socketsMiddlewaresManager([
        isBookTableDataValid,
        isRoomPresentMiddlewareSockets,
        isTableOccupiedMiddleware
    ], socket, event);

    if (errorStatus && errorStatus.status) {
        errorHandlerSockets(errorStatus.message, errorStatus.code, socket);
    } else {
        await roomController.bookTable(event.bookUserTable, event.room_id);
        const bookedUser = await userController.getUserByParams({_id: event.bookUserTable.user_id});

        event.bookUserTable.user_id = `${bookedUser?.name} ${bookedUser?.surname}`;
        socket.broadcast.to(event.room).emit('book_table', event);
    }
};
