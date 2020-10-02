import { Socket } from 'socket.io';

export const getMyRoomSockets = (socket: Socket) => {
    Object.keys(socket.rooms).filter((r) => r !== socket.id)
        .forEach((r) => socket.leave(r));

    return socket;
};
