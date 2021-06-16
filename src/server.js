import express from "express";
import cors from "cors";
import passport from "passport";
import oauth from "./auth/oauth.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import { jwtAuth } from "./auth/index.js";
import { createServer } from "http";
import { Server } from "socket.io";

import {
  errorHandler,
  routeNotFoundHandler,
} from "./middlewares/errors/errorHandling.js";

const app = express();
const server = createServer(app);
const io = new Server(server, { allowEIO3: true });

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
// ROUTES

app.use("/", authRouter);

// ERROR HANDLERS
app.use(routeNotFoundHandler);
app.use(errorHandler);

// PORT
const port = process.env.PORT || 5000;

// we add functions in here from our ROUTES (users, rooms) so that we can use them in the socketIo functions below
// Example: const { addUser, removeUser, getUser, users, groups, addUserIntoGroup} = require('./Router/onlineUsers');

users = [];

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("join server", (username) => {
    const user = {
      username,
      id: socket.id,
    };
    users.push(user);
    io.emit("new user", Users);
  });

  // cb (callback) is defined and in the client side
  // and invoked server side that fetches all the messages in that room
  socket.on("join room", (roomId, cb) => {
    socket.join(roomId);
    cb(messages[roomId]);
  });

  socket.on(
    "send message",
    ({
      messageText,
      groupORsocketId,
      senderUserId,
      chatName,
      isGroup,
      createdAt,
    }) => {
      // io.sockets.in("main-room").emit("message", message)
      if (isGroup) {
        const payload = {
          messageText,
          chatName,
          senderUserId,
        };
        socket.to(groupORsocketId).emit("new message", payload);
      } else {
        const payload = {
          messageText,
          chatName: senderUserId,
          senderUserId,
        };
        socket.to(groupORsocketId).emit("new message", payload);
      }

      console.log(message);
      socket.to("main-room").emit("message", message);

      // saveMessageToDb(message)
    }
  );

  // socket.on('startMessage', ({sender, recipient, token, senderEmail}) => {
  //     startMessage(sender, token, recipient);
  //     addUser({id: socket.id, email: senderEmail})
  // })
  // socket.join("main-room");
  // socket.join("secondary-room");
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

  // socket.on("sendmessage", (message) => {
  //   // io.sockets.in("main-room").emit("message", message)
  //   console.log(message);
  //   socket.to("main-room").emit("message", message);

  //   // saveMessageToDb(message)
  // });

  socket.on("disconnect", () => {
    console.log("Disconnected socket with id " + socket.id);

    // onlineUsers = onlineUsers.filter((user) => user.id !== socket.id);

    socket.broadcast.emit("newConnection");
  });
});

mongoose
  .connect(process.env.MONGODB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port);
    })
  )
  .catch((err) => console.log(err));
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
