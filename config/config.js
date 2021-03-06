module.exports = {
    MONGO_HOST: process.env.MONGO_HOST || 'mongo',
    MONGO_PORT: process.env.MONGO_PORT || '27017',
    MONGO_DB: process.env.MONGO_DB || 'myapp',
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PWD: process.env.MONGO_PWD,
    REDIS_URL: process.env.REDIS_URL || 'redis',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    SESSION_SECRET: process.env.SESSION_SECRET
}