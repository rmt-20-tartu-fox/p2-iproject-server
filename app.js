if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

const express = require("express");

const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express();
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
})

io.on('connection', (socket)=> {
  console.log('A User has been connected.', socket.id)

  socket.on('disconnect', ()=> {
    console.log('A User has been disconnected.')
  })

  socket.on('costumEventFromClient', (payload)=> {
    console.log('Got Payload.', payload)

    
    socket.emit('costumEventFromServer', "From Server")

  })
})

const port = process.env.PORT || 3000;
const errorHandler = require("./middleware/errorHandler");

const router = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.use(errorHandler);

httpServer.listen(port, (_) => console.log("Server is running on port:", port));