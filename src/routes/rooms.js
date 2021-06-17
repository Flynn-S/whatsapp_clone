import { Router } from "express";

import RoomsModel from "../models/rooms.js";

const roomsRouter = express.Router();

roomsRouter.get("/", async (req, res, next) => {
  const roomse = await RoomsModel.find({});
  res.send(roomse);
});
//create a new room
roomsRouter.post("/", async (req, res, next) => {
  const newRoom = await RoomsModel.create({
    usersId: [req.body.user, req.user._id],
  });
  res.send(newRoom);
});
//add new partecipant to a room
roomsRouter.put("/:roomId", async (req, res, next) => {
  try {
    const modifiedRoom = await RoomsModel.findOneAndUpdate(
      { _id: req.params.roomId },
      { $push: { usersId: req.body.user } },
      { new: true, runValidators: true }
    );
    res.send(modifiedRoom);
  } catch (error) {
    next(error);
  }
});

roomsRouter.get("/:roomId", async (req, res, next) => {
  // participants, details
  const room = await RoomsModel.findById(req.params.id).populate("usersId");

  res.send(room);
});

roomsRouter.get("/:roomId/history", async (req, res, next) => {
  const room = await RoomsModel.findById(req.params.id);
  const chatHistory = [...room.chatHistory.slice(0, 10).reverse()];
  res.send(chatHistory);
});

roomsRouter.post("/:roomId/message", async (req, res, next) => {
  const room = await RoomsModel.findOneAndUpdate(
    { _id: req.params.roomId },
    { $push: { chatHistory: req.body } },
    { new: true, runValidators: true }
  );
});

roomsRouter.delete("/:roomId/message/messageId", async (req, res, next) => {
  const room = await RoomsModel.findOneAndUpdate(
    { _id: req.params.roomId },
    { $pull: { chatHistory: messageToDelete.messageId } },
    { runValidators: true, new: true, projection: { messages: 1 } }
  );

  if (messageToDelete) {
    res.status(202).send("message deleted");
  } else {
    const error = new ErrorResponse(
      `Experience with id ${req.params.expId} not found`,
      404
    );
    next(error);
  }
});

export default roomsRouter;
