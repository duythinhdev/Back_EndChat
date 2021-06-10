const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const userRoutes = require('./api/users/users')
var mongoDB =  'mongodb+srv://duythinh:716284@cluster0.dovxc.mongodb.net/messengerapp?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDb connected"))
    .catch(err => console.log(err));


// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });
mongoose.Promise = global.Promise;

app.use(cors({
    origin: "http://localhost:1999",
    credentials:true,
    optionsSuccessStatus: 200
}))

app.use("/users",userRoutes);
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

