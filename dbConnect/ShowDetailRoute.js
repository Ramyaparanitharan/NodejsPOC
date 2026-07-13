import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/",async(req,res)=>{
    try {
        const tickets = await mongoose.connection.db
                        .collection("tickets")
                        .find({})
                        .toArray()
        console.log(res.json(tickets))
    } catch (error) {
        console.log(error)
    }
})

router.post("/",async(req,res)=>{
    const { showname, numbertickets } = req.body;
    res.json(
        {
            showname : showname,
            numbertickets : numbertickets
        }
    )
    await mongoose.connection.db
    .collection("tickets")
    .insertOne({
        showname : showname,
        numbertickets : numbertickets
    })
})

export default router;