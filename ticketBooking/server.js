import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import eventRoutes from "./routes/eventRoutes.js";
import seatRoutes from "./routes/seatRoute.js";
import bookingRoutes from "./routes/bookingRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/bookings", bookingRoutes);

const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();