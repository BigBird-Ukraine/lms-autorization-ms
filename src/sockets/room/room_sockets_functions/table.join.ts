import { Socket } from 'socket.io';

import { getMyRoomSockets } from '../../../helpers/room';

export const tableJoin = (socket: Socket, room: string) => {
    socket = getMyRoomSockets(socket);

    setTimeout(() => {
        socket.join(room);
        socket.emit('book_table', 'Joined table ' + room);
        socket.broadcast.to(room).emit('book_table', 'Someone joined to table ' + room);
    }, 0);
};
