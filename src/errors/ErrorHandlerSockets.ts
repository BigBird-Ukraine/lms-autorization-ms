import { SocketEventsEnum } from '../constants/enums';

export const errorHandlerSockets = (message: string, code: number, socket: any) => {
    socket.emit(SocketEventsEnum.ERROR_TYPE, JSON.stringify({message, code}));
};
