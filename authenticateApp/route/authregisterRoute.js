import express from "express";
import { registerUser } from "../controller/authregisterController.js";
const router = express.Router();
router.post("/",registerUser);
export default router;
