import express from "express";
import mongoose from "mongoose";
import ShowDetailRoute from "./ShowDetailRoute.js";
import bookDetailRoute from "./bookDetailRoute.js";
const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hi");
})

mongoose.connect("mongodb://127.0.0.1:27017/ticketDetails")
.then(()=>console.log("db connected"))
.catch(err => console.log(err))

app.use("/getShowDetails",ShowDetailRoute);
app.use("/bookdetails",bookDetailRoute);

app.listen(3000,()=>{
    console.log("server connected")
})