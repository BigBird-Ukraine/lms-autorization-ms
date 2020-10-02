import { Socket } from 'socket.io';

import { IResponseSocket, ITableEvent } from '../../interfaces';

export const socketsMiddlewaresManager = async (middlewares: any[], socket: Socket, events?: ITableEvent) => {
    let errorStatus: IResponseSocket | null = null;
    for await (const middleware of middlewares) {
        if (!errorStatus?.status) {
            // @ts-ignore
            errorStatus = await middleware(errorStatus?.socket || socket, events);
        } else {
          return errorStatus;
        }
    }
};
