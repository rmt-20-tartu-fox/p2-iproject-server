if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

const express = require("express");

const { createServer } = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true
  },
  // allowEIO3: true 
})

let arrOfUsers = []
let arrOfChats = []

io.on('connection', (socket)=> {
  console.log('A User has been connected.', socket.id)
  socket.on('disconnect', ()=> {
    console.log('A User has been disconnected.')
  })

  socket.on('customEventFromClient', (payload)=> {
    console.log('Got Payload.', payload)
    socket.emit('customEventFromServer', "From Server")
  })

  socket.on('setNameOfUser', payload => {
    arrOfUsers.push({
      username: payload,
      status: "online"
    })
  })

  socket.on('inputChats', payload => {
    arrOfChats.push(payload)
    io.emit('chatFromServer', arrOfChats)
  })

  socket.on('statusUser', payload => {
    arrOfUsers.forEach(el => {
      if (el.username == payload.username) {
        el.status = payload.status
      }
    })
  })
})

const port = process.env.PORT || 3000;
const errorHandler = require("./middleware/errorHandler");

const router = require("./routes");



app.use("/", router);

app.use(errorHandler);

httpServer.listen(port, (_) => console.log("Server is running on port:", port));