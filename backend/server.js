import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("what is socket: ", socket);
  console.log("socket is active to be connected");

  socket.on("chat", (payload) => {
    console.log("what is payload: ", payload);
    io.emit("chat", payload);
  });
});

httpServer.listen(8000, () => {
  console.log("server started on port: 8000...");
});
