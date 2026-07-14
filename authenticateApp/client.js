import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected:", socket.id);

  socket.emit("message", "hello server");
});

socket.on("message", (data) => {
  console.log("Received:", data);
});

socket.on("newUser", (user) => {
  console.log("New User Registered:", user);
});