const http  = require('http');
require('dotenv').config();
const port =  3000 || process.env.PORT_LOCAL;
const  app  = require("./app");
const server = http.createServer(app);
server.listen(port)
