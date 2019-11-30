export const config = {
    PORT: 3000,
    HOST: 'http://localhost',

    JWT_SECRET: process.env.PORT || 'uf7e^Wai8efj32-&&620O10fm-32jfdj',
    ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || '10m',

    JWT_REFRESH_SECRET: process.env.PORT || '3f7e^fdf(*kjsd-&&620O10fm-333222fsd',
    REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || '1h',

    serverRateLimits: {
        period: 15 * 60 * 1000, // 15 minutes
        maxRequests: 10000
    },

    DATABASE_NAME: 'lms_db',
    DATABASE_USER: 'root',
    DATABASE_PASS: 'root',
    DATABASE_HOST: '127.0.0.1',
};
