import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import userRouter from "./routes/user.route";
import messageRouter from "./routes/message.route";
import { connectDB } from "./config/connectDB";

dotenv.config();

const app = express();
const httpServer = createServer(app);

/* ================= Socket.IO ================= */

const io = new Server(httpServer, {
  cors: {
    origin: "https://www-nexora.netlify.app",
    credentials: true,
  },
});

/* ================= Middlewares ================= */

app.use(
  cors({
    origin: "https://www-nexora.netlify.app",
    credentials: true,
  })
);
app.use(express.json());

connectDB();

/* ================= Routes ================= */

app.get("/", (_req, res) => {
  res.send("Hello via Bun!");
});

app.use("/api/auth", userRouter);
app.use("/api/message", messageRouter);

/* ================= Online Users ================= */

interface OnlineUser {
  userId: string;
  socketId: string;
}

let onlineUsers: OnlineUser[] = [];

const addUser = (userId: string, socketId: string) => {
  if (!onlineUsers.some((u) => u.userId === userId)) {
    onlineUsers.push({ userId, socketId });
  }
};

const removeUser = (socketId: string) => {
  onlineUsers = onlineUsers.filter((u) => u.socketId !== socketId);
};

const getUser = (userId: string) =>
  onlineUsers.find((u) => u.userId === userId);

/* ================= Socket Logic ================= */

io.on("connection", (socket: Socket) => {
  console.log("🟢 New client connected:", socket.id);

  /* -------- User Online -------- */
  socket.on("user-online", (userId: string) => {
    addUser(userId, socket.id);

    io.emit(
      "online-users",
      onlineUsers.map((u) => u.userId)
    );
  });

  /* -------- Typing -------- */
  socket.on(
    "typing",
    ({
      senderId,
      receiverId,
      isTyping,
    }: {
      senderId: string;
      receiverId: string;
      isTyping: boolean;
    }) => {
      const receiver = getUser(receiverId);
      if (receiver) {
        io.to(receiver.socketId).emit("typing", {
          senderId,
          isTyping,
        });
      }
    }
  );

  /* -------- Send Message -------- */
  socket.on(
    "send-message",
    ({
      message,
      receiverId,
    }: {
      message: any;
      receiverId: string;
    }) => {
      const receiver = getUser(receiverId);
      if (receiver) {
        io.to(receiver.socketId).emit("receive-message", message);
      }
    }
  );

  /* -------- Seen -------- */
  socket.on(
    "message-seen",
    ({
      senderId,
      receiverId,
    }: {
      senderId: string;
      receiverId: string;
    }) => {
      const sender = getUser(senderId);
      if (sender) {
        io.to(sender.socketId).emit("message-seen", {
          receiverId,
        });
      }
    }
  );

  /* -------- Disconnect -------- */
  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
    removeUser(socket.id);

    io.emit(
      "online-users",
      onlineUsers.map((u) => u.userId)
    );
  });
});

/* ================= Server ================= */

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
