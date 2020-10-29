import { Socket } from 'socket.io';

import { IResponseSocket, ITableEvent } from '../../interfaces';

export const socketsMiddlewaresManager = async (middlewares: any[], socket: Socket, events?: ITableEvent) => {
    let errorStatus: IResponseSocket = null as any;

    for await (const middleware of middlewares) {
        errorStatus?.status ? breakFunction() : errorStatus = await middleware(errorStatus?.socket || socket, events);
    }

    return errorStatus;
};

const breakFunction = () => {
    return;
};
