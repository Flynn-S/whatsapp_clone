import { Router } from "express";

import RoomsModel from "../models/rooms.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const roomse = await RoomsModel.find({});
    res.send(roomse);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//create a new room
router.post("/", async (req, res, next) => {
  try {
    const newRoom = await RoomsModel.create({
      usersId: [req.body.user, req.user._id],
    });
    res.send(newRoom);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//add new partecipant to a room
router.put("/:roomId", async (req, res, next) => {
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

router.get("/:roomId", async (req, res, next) => {
  // participants, details
  const room = await RoomsModel.findById(req.params.roomId).populate("usersId");

  res.send(room);
});

router.get("/:roomId/history", async (req, res, next) => {
  const room = await RoomsModel.findById(req.params.roomId);
  const chatHistory = [...room.chatHistory.slice(0, 10).reverse()];
  res.send(chatHistory);
});

router.post("/:roomId/message", async (req, res, next) => {
  const newMessage = { ...req.body, senderId: req.user._id };
  const room = await RoomsModel.findOneAndUpdate(
    { _id: req.params.roomId },
    { $push: { chatHistory: newMessage } },
    { new: true, runValidators: true }
  );
  res.status(201).send();
});

export default router;
