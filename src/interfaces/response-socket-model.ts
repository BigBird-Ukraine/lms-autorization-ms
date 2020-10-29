import { Socket } from 'socket.io';

export interface IResponseSocket {
    status: number;
    code: number;
    message: string;

    socket?: Socket;
}
