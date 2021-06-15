import mongoose from "mongoose";

const { Schema, model } = mongoose;

const RoomSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model("Room", RoomSchema);
