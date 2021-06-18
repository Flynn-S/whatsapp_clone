import express from 'express';
import cors from 'cors';
import passport from 'passport';
import oauth from './auth/oauth.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authRouter from './routes/auth.js';
import roomsRoutes from './routes/rooms.js';
import usersRoutes from './routes/users.js';
import listEndpoints from 'express-list-endpoints';
import mongoose from 'mongoose';
import { jwtAuth } from './auth/index.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

import {
  errorHandler,
  routeNotFoundHandler,
} from './middlewares/errors/errorHandling.js';

const app = express();
const server = createServer(app);
const io = new Server(server, { allowEIO3: true });

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
// ROUTES
app.use(morgan('dev'));

app.use('/', authRouter);

app.use('/rooms', jwtAuth, roomsRoutes);

app.use('/users', jwtAuth, usersRoutes);

// ERROR HANDLERS
app.use(routeNotFoundHandler);
app.use(errorHandler);

// PORT
const port = process.env.PORT || 5000;

io.on('connection', (socket) => {
  console.log(socket);

  socket.join('main-room');
  socket.join('secondary-room');
  console.log(socket.rooms);

  socket.on('setUsername', ({ username }) => {
    console.log('here');
    onlineUsers = onlineUsers
      .filter((user) => user.username !== username)
      .concat({
        username,
        id: socket.id,
      });
    console.log(onlineUsers);

    socket.emit('loggedin');

    socket.broadcast.emit('newConnection');
  });

  socket.on('sendmessage', (message) => {
    // io.sockets.in("main-room").emit("message", message)
    console.log(message);
    socket.to('main-room').emit('message', message);

    // saveMessageToDb(message)
  });

  socket.on('disconnect', () => {
    console.log('Disconnected socket with id ' + socket.id);

    // onlineUsers = onlineUsers.filter((user) => user.id !== socket.id);

    socket.broadcast.emit('newConnection');
  });
});
console.table(listEndpoints(app));
mongoose
  .connect(process.env.MONGODB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(
    server.listen(port, () => {
      console.log('Running on port', port);
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
