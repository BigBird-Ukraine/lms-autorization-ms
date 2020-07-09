import * as winston from 'winston';

import { config } from './config';

const options = {
    errorFile: {
        level: 'error',
        name: 'file.error',
        filename: `${__dirname}/../logs/error.log`, // todo resolve issues with undefined directory appRoot
        handleExceptions: true,
        json: true,
        maxsize: config.logFileSize,
        maxFiles: 100,
        colorize: true
    }
};

export const logger = winston.createLogger({
    transports: [
        new (winston.transports.File)(options.errorFile)
    ],
    exitOnError: false
});
