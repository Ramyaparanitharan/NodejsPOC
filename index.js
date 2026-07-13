import express from "express";
import mongoose from "mongoose";
import ticketDetailsRoutes from "./ticketDetailRoutes.js"
const app = express();
app.use(express.json());

// simple get
app.get("/",(req,res)=>{
    res.send("hi");
})
app.post("/",(req,res)=>{
    const {name} = req.body;
    res.send(`hello ${name}`)
})


mongoose.connect("mongodb://127.0.0.1:27017/ticketDetails")
.then(()=>console.log("mongoose db connected"))
.catch(err=>console.log(err))

app.use("/ticketdetails", ticketDetailsRoutes);

//start server
app.listen("3000",()=>{
    console.log("Server Started")
})


