import mongoose from "mongoose";
const bookingSchema = new mongoose.schema({
    eventId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Event",
        required : true
    },
    seatId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Seat",
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
    timeStamps : true
}
);
export default mongoose.model("Booking", bookingSchema)