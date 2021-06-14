import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";

import {
  errorHandler,
  routeNotFoundHandler,
} from "./middlewares/errors/errorHandling.js";

const server = express();

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
