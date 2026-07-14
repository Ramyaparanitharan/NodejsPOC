import mongoose from "mongoose";
const authRegisterSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        email :{
            type : String,
            required : true
        },
        adharNumber : {
            type : Number,
            required : true
        }
    }
)

export default mongoose.model("AuthRegister", authRegisterSchema)