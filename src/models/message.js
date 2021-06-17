import mongoose from "mongoose";

const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
      minlength: 1,
    },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default MessageSchema;
