import { Socket } from 'socket.io';

import { io } from '../../index';
import { ITableEvent, IUserFromTokenModel } from '../../interfaces';
import { checkAccessTokenMiddlewareSockets } from '../../middlewares';
import { bookTable, cancelBook, tableJoin } from './room_sockets_helpers';

export default () => {
    io.on('connection', async (socket: Socket) => {
        const user: IUserFromTokenModel = await checkAccessTokenMiddlewareSockets(socket);
        socket.handshake.query.user = user && user.user_id;

        socket.on('table.join', (e: ITableEvent) => tableJoin(socket, e));

        socket.on('book_table', async (e: ITableEvent) => await bookTable(socket, e));
        socket.on('cancel_book', async (e: ITableEvent) => await cancelBook(socket, e));
    });
};
