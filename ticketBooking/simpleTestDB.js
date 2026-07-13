import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("connected"))
    .catch(console.error);


app.get("/events", async (req, res) => {
    try {
        const events = await mongoose.connection
            .collection("events")
            .find({})
            .toArray();

        res.json(events);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});