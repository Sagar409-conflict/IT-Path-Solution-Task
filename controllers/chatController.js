import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";
import { validationResult } from "express-validator";
import ChatResource from "../resources/chat.resource.js";

async function getMessages(req, res) {
  try {
    const { room } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const chat = await Chat.find({ room })
      .populate("sender", "name")
      .select("room content createdAt")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    if (!chat.length) {
      return res.status(404).json({
        msg: `${room} room is empty, there is no any conversation`,
        data: null,
      });
    }

    let result = chat.map((element) => {
      return { ...new ChatResource(element) };
    });
    let totalRecords = await Chat.find({ room }).countDocuments();
    return res.status(200).json({
      msg: `Here we have all messages of ${room}, successfully`,
      data: {
        result,
        meta: {
          totalPages: Math.ceil(totalRecords / limit),
          currentPage: Math.abs(page),
          recordsPerPage: Math.abs(limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: `We are facing difficulties while fetching messages from ${room} room  , Please try again later`,
      data: null,
    });
  }
}

export default {
  getMessages,
};
