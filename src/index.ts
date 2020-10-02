import * as http from 'http';
import * as socketIo from 'socket.io';

import { app } from './app';
import { config } from './configs';
import { connection } from './sockets';

const server = http.createServer(app);

export const io = socketIo(server);
connection();

server.listen(config.PORT, () => {
    console.log(`App listening on port ${config.PORT}!`);
});

process.on('SIGTERM', () => {
    server.close(() => {
        process.exit(0);
    });
});
