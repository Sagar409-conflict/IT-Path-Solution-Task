import mongoose from "mongoose";
const chatSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: String,
    room: String,
  },
  {
    timestamps: true,
  }
);
const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
