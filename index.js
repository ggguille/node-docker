const express = require("express")
const mongoose = require("mongoose")
const redis = require('redis')
const session = require('express-session')
const cors = require("cors")

let RedisStore = require('connect-redis')(session)

const {
    MONGO_HOST,
    MONGO_PORT,
    MONGO_USER,
    MONGO_PWD,
    MONGO_DB,
    REDIS_URL,
    REDIS_PORT,
    SESSION_SECRET,
} = require('./config/config');

let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")
const statusRouter = require("./routes/statusRoutes")

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PWD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

const connectDbWithRetry = () => {
    mongoose
        .connect(mongoUrl, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(() => console.log('successfully connected to DB'))
        .catch((e) => {
            console.log(e)
            setTimeout(connectDbWithRetry, 5000)
        })
}
connectDbWithRetry()

const app = express();
app.enable("trust proxy")
app.use(cors({}))
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: SESSION_SECRET,
        cookie: {
            secure: false,
            resave: false,
            saveUninitialized: false,
            httpOnly: true,
            maxAge: 120000
        }
    })
)
app.use(express.json())
app.use("/api/v1/status", statusRouter)
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`))