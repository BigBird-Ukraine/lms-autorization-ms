export const errorHandlerSockets = (message: string, code: number, socket: any) => {
    socket.emit('error type', JSON.stringify({message, code}));
};
