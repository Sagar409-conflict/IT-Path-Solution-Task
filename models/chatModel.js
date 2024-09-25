import mongoose from "mongoose";
const chatSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    content: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
