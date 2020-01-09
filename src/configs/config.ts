import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../../.env.example') });

export const config = {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || 'http://localhost',

    JWT_SECRET: process.env.JWT_SECRET || 'uf7e^Wai8efj32-&&620O10fm-32jfdj',
    ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || '10m',

    JWT_REFRESH_SECRET: process.env.PORT || '3f7e^fdf(*kjsd-&&620O10fm-333222fsd',
    REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || '1h',

    serverRateLimits: {
        period: 15 * 60 * 1000, // 15 minutes
        maxRequests: 10000
    },

    DATABASE_NAME: process.env.DATABASE_NAME || 'lmsDB',
    DATABASE_USER: process.env.DATABASE_USER || 'root',
    DATABASE_PASS: process.env.DATABASE_PASS || 'root',
    DATABASE_IP: process.env.DATABASE_IP || '127.0.0.1',
    DATABASE_PORT: process.env.DATABASE_PORT || '27017',

    logFileSize: 5 * 1024 * 1024, // 5mb

    MAX_PHOTO_SIZE: 5 * 1024 * 1024,
    PHOTO_MIMETYPES: ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/png', 'image/webp'],

    MAX_QUESTION_LIMIT: 20
};
