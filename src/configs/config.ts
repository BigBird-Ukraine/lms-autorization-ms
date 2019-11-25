export const config = {
    DATABASE_NAME: 'someDB',
    DATABASE_USER: 'mongo user',
    DATABASE_PASS: 'mongo pass',
    PORT: 3000,

    serverRateLimits: {
        period: 15 * 60 * 1000, // 15 minutes
        maxRequests: 10000
    }
};
