import express from "express";
import UserModel from "../models/user.js";

const usersRouter = express.Router();

usersRouter.post("/update"), (req, res, next) => {};

usersRouter.get("/users"), (req, res, next) => {};

usersRouter.get("/users/:id"), (req, res, next) => {};

usersRouter.get("/users/:id/rooms"),
  (req, res, next) => {
    const id = req.params.id;

    // if (id === ) return

    const rooms = RoomModel.find({ userId: id });

    // const rooms = RoomModel.find({ userId: { $elemMatch: { id } } });
  };

export default usersRouter;
