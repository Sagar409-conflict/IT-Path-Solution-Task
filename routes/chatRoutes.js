import express from "express";
import { check } from "express-validator";
import ChatController from "../controllers/chatController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get-messages/:room", ChatController.getMessages);

export default router;
