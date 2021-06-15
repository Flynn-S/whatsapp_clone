import mongoose from "mongoose";
import { MessageSchema } from "./message.js";
const { Schema, model } = mongoose;

const RoomsSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  chatHistory: [MessageSchema],
});

export default model("Rooms", RoomsSchema);
