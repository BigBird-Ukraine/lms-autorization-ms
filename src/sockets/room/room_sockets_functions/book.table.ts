import {Socket} from 'socket.io';

import {roomController} from '../../../controllers/room';
import {errorHandlerSockets} from '../../../errors';
import {ITableEvent, IUser} from '../../../interfaces';
import {isBookTableDataValid, isRoomPresentMiddlewareSockets, isTableOccupiedMiddleware} from '../../../middlewares';
import {userController} from "../../../controllers/user";

export const bookTable = async (socket: Socket, e: ITableEvent, user: IUser) => {
    let response: any;

    response = await isBookTableDataValid(e.bookUserTable);

    response = response && response.status || await isRoomPresentMiddlewareSockets(e.room_id);
    response = response && response.status || await isTableOccupiedMiddleware(user, e.bookUserTable, response.room);

    if (response && response.status) {
        errorHandlerSockets(response.message, response.code, socket);
    } else {
        await roomController.bookTable(e.bookUserTable, e.room_id);
        const bookedUser = await userController.getUserByParams({_id: e.bookUserTable.user_id});

        e.bookUserTable.user_id = `${bookedUser?.name} ${bookedUser?.surname}`;
        socket.broadcast.to(e.room).emit('book_table', e);
    }
};
