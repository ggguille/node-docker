const express = require("express")
const mongoose = require("mongoose");

const {
    MONGO_HOST,
    MONGO_PORT,
    MONGO_USER,
    MONGO_PWD
} = require('./config/config');

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PWD}@${MONGO_HOST}:${MONGO_PORT}?authSource=admin`

mongoose
    .connect(mongoUrl, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('successfully connected to DB'))
    .catch((e) => console.log(e))

const app = express();

app.get('/', (req, res) => {
    res.send('<h2>Hi There!!</h2>')
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`))