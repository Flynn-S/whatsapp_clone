import express from "express";
import cors from "cors";

import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";

import {
  errorHandler,
  routeNotFoundHandler,
} from "./middlewares/errors/errorHandling.js";

const server = express();
const server = createServer(server);
const io = new Server(server, { allowEI03: true });

server.use(cors());
// app.use(cors(corsOptions));

server.use(express.json());

// ROUTES

// ERROR HANDLERS
server.use(routeNotFoundHandler);
server.use(errorHandler);

// PORT
const port = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port);
    })
  )
  .catch((err) => console.log(err));

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.join("main-room");
  console.log(socket.rooms);

  socket.on("setUsername", ({ username }) => {
    console.log("here");
    onlineUsers = onlineUsers
      .filter((user) => user.username !== username)
      .concat({
        username,
        id: socket.id,
      });
    console.log(onlineUsers);

    socket.emit("loggedin");

    socket.broadcast.emit("newConnection");
  });

  socket.on("sendmessage", (message) => {
    // io.sockets.in("main-room").emit("message", message)
    socket.to("main-room").emit("message", message);

    // saveMessageToDb(message)
  });

  socket.on("disconnect", () => {
    console.log("Disconnected socket with id " + socket.id);

    onlineUsers = onlineUsers.filter((user) => user.id !== socket.id);

    socket.broadcast.emit("newConnection");
  });
});

app.get("/online-users", (req, res) => {
  res.send({ onlineUsers });
});

// const {addUser, removeUser, getUser, users, groups, addUserIntoGroup} = require('./Router/onlineUsers');
// io.on('connection', socket => {

// socket.on('disconnect', () => {
//     removeUser(socket.id);
// })

// socket.on('startMessage', ({sender, recipient, token, senderEmail}) => {
//     startMessage(sender, token, recipient);
//     addUser({id: socket.id, email: senderEmail})
// })

// socket.on('sendMessage', ({sender, recipient, token, message}) => {
//     createMessage(sender, token, recipient, message)
//     .then(res => {
//         io.emit('message', res)
//     })
// })

// socket.on('sendGroupMessage', ({sender, recipient, token, message}) => {
//     createGroupMessage(sender, token, recipient, message)
//     .then(res => {
//         io.to(res.recipient.code).emit('groupMessage', res)
//     })
// })

// socket.on('joinGroup', ({group, userInfo}) => {
//     socket.join(group);
//     addUserIntoGroup({group, userInfo});
// })
// })
