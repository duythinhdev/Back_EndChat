const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const morgan = require('morgan');
const tableChatRoutes = require('./api/tablechat/convert')
const userRoutes = require('./api/users/users')
const messageRoutes = require('./api/message/message')
const io = require("socket.io")(8900,{
    cors: {
        origin: "http://localhost:1999"
    }
})


var mongoDB =  'mongodb+srv://duythinh:716284@cluster0.dovxc.mongodb.net/messengerapp?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDb connected"))
    .catch(err => console.log(err));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(morgan('dev'));
//tell express to use bodyParser for JSON and URL encoded form bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/users",userRoutes);
app.use("/tablechat",tableChatRoutes)
app.use("/message",messageRoutes)
mongoose.Promise = global.Promise;

io.on("connection",(socket) =>{
    console.log("a user connected.")
    io.emit("welcome hello this is socket server")
})
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status(404);
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;

