export const config = {
    DATABASE_NAME: 'lms_db',
    DATABASE_USER: 'root',
    DATABASE_PASS: 'root',
    DATABASE_HOST: '127.0.0.1',
    PORT: 3000,

    serverRateLimits: {
        period: 15 * 60 * 1000, // 15 minutes
        maxRequests: 10000
    }
};
