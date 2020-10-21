import { Socket } from 'socket.io';

import { SocketEventsEnum } from '../../../constants/enums';
import { roomController, userController } from '../../../controllers';
import { errorHandlerSockets } from '../../../errors';
import { socketsMiddlewaresManager } from '../../../helpers';
import { io } from '../../../index';
import { IResponseSocket, ITableEvent, IUser } from '../../../interfaces';
import {
    isBookTableDataValid,
    isRoomPresentMiddlewareSockets,
    isTableOccupiedMiddlewareSockets,
    isUserBookingBaned
} from '../../../middlewares';

export const bookTable = async (socket: Socket, event: ITableEvent) => {
    const middlewares = [isBookTableDataValid, isRoomPresentMiddlewareSockets, isUserBookingBaned, isTableOccupiedMiddlewareSockets];
    const errorStatus: IResponseSocket | undefined = await socketsMiddlewaresManager(middlewares, socket, event);

    if (errorStatus?.status) {
        errorHandlerSockets(errorStatus.message, errorStatus.code, socket);
    } else {
        await roomController.bookTable(event.bookUserTable, event.room_id);
        const bookedUser = await userController.getUserByParams({_id: event.bookUserTable.user_id as string});

        event.bookUserTable.user_id = {
            _id: bookedUser?._id,
            name: bookedUser?.name,
            surname: bookedUser?.surname
        } as Partial<IUser>;

        io.in(event.room).emit(SocketEventsEnum.BOOK_TABLE, event);
    }
};
