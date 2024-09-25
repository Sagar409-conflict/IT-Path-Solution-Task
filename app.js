import express from "express";
import dotenv from "dotenv";
import http from "http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import Chat from "./models/chatModel.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import YAML from "yamljs";
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = user;
    next();
  } catch (err) {
    next(
      new Error("Authentication error while making a connection with a Socket")
    );
  }
});
io.on("connection", (socket) => {
  console.log(`${socket.id} ===> is connected`);

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`${socket.user.id} joined room ${room}`);
  });

  socket.on("message", async ({ room, message }) => {
    try {
      const msgPayload = {
        sender: socket.user.id,
        content: message,
        room,
      };
      const newMessage = new Chat(msgPayload);
      await newMessage.save();
      console.log(`Message from ${socket.id}: ${msgPayload}`);
      io.to(room).emit("message", msgPayload);
    } catch (error) {
      console.error("Error saving message:", error);
      socket.emit("error", { message: "Failed to send message" });
    }
  });
  socket.on("disconnect", () => {
    console.log(`${socket.id} has disconnected`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
io.attach(server);
