import express from "express";
import connectDB from "./config/db.js";
import authregisterRoute from "./route/authregisterRoute.js";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/register", authregisterRoute);

const server = http.createServer(app);

const io = new Server(server,{
  cors:{
    origin : "*",
    methods : ["GET","POST"]
  }
});

app.set("io",io);

io.on("connection",(socket)=>{
 console.log("user connected");
 socket.on("message", (data)=>{
  io.emit("message",data)
 });

 socket.on("disconnect",()=>{
  console.log("user disconnected", socket.id)
 });

});

const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();