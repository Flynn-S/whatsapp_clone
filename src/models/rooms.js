import mongoose from "mongoose";
import { ChatHistorySchema } from "../chatHistory/schema.js";
const { Schema, model } = mongoose;

const RoomsSchema = new Schema({
  users: [{ type: ObjectId, trim: true, required: true }],
  chatHistory: [ChatHistorySchema],
});

export default model("Rooms", RoomsSchema);
