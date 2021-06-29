const express = require("express")
const mongoose = require("mongoose");

const {
    MONGO_HOST,
    MONGO_PORT,
    MONGO_USER,
    MONGO_PWD,
    MONGO_DB
} = require('./config/config');

const postRouter = require("./routes/postRoutes")

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

app.get('/', (req, res) => {
    res.send('<h2>Hi There!!</h2>')
})

app.use("/api/v1/posts", express.json())
app.use("/api/v1/posts", postRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`))