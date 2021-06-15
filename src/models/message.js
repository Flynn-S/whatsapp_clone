import mongoose from "mongoose";

const { Schema, model } = mongoose;

const MessageSchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
    },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  },
  { timestamps: true }
);

export default model("Message", MessageSchema);
