import { Socket } from 'socket.io';
import { ITableEvent } from '../../../interfaces';

export const tableJoin = async (socket: Socket, event?: ITableEvent) => {
    setTimeout(() => {
        socket.join(event?.room as string);
    }, 0);
};
