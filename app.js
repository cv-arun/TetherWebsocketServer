const express = require('express');
const http = require("http");
const socketServer = require('./socketServer')
const { Server } = require('socket.io');
const cors = require('cors');
const logger = require('morgan');

const app = express()
const server = http.createServer(app);

app.use(cors())


app.use(express.json());
app.use(logger('dev'));



const io = new Server(server, {
  cors: {
    origin: ["*"],
    handlePreflightRequest:(req,res)=>{
      res.writeHead(200,{
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"GET,POST",
        "Access-Control-Allow-Headers":"my-custom-header",
        "Access-Control-Allow-Credentials":true
      });
      res.end();
    }
  },
});

io.on('connection', (socket) => {
  console.log('io connected')
  socketServer(socket)
})
app.use('/', (req, res) => {
  console.log('call reached')

  res.send('running')
})


const PORT = 4000
server.listen(PORT, () =>
  console.log(` app listening on port ${PORT}!`),
);