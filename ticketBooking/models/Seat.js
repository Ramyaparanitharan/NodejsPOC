import mongoose from "mongoose";

const SeatSchema = new mongoose.Schema({
    eventId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Event",
        required : true
    },
    row  : {
        type : String,
        required : true
    },
    number : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ['available','locked','booked'],
        default : 'available'
    },
    price : {
        type : Number,
        required : true
    }
},
{
    timestamp : true
}
);
SeatSchema.index(
    {
        eventId : 1,
        row : 1,
        number : 1
    },
    {
        unique : true
    }
);

export default mongoose.model("Seat", SeatSchema);
