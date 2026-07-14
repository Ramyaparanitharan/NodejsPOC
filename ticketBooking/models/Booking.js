
import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema(
    {
    eventId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Event",
        required : true
    },
    row : {
        type : String,
        required : true
    },
    number :{
        type : Number,
        required : true
    },
    userName : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : "confirmed"
    }
},
{
    timestamps : true
}
);
export default mongoose.model("Booking", bookingSchema)