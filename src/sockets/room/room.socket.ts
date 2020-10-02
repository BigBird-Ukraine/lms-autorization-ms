import { Socket } from 'socket.io';

import { io } from '../../index';
import { ITableEvent, IUserFromTokenModel } from '../../interfaces';
import { checkAccessTokenMiddlewareSockets } from '../../middlewares';
import { bookTable, tableJoin } from './room_sockets_functions';

export default () => {

    io.on('connection', async (socket: Socket) => {
        const user: IUserFromTokenModel = await checkAccessTokenMiddlewareSockets(socket);

        socket.on('table.join', (room: string) => tableJoin(socket, room));

        socket.on('book_table', async (e: ITableEvent) => await bookTable(socket, e, user.user_id));
    });
};
