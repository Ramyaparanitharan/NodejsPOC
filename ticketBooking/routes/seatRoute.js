import express from "express";
import { getSeats } from "../controllers/seatController.js";

const router = express.Router();
router.get("/",getSeats);
export default router;
