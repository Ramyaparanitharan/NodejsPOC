import Seat from "../models/Seat.js";
export const getSeats = async (req,res) => {
    try {
        const seats = await Seat.find();
        res.json(seats);
    } catch (error) {
        console.log(error)
    }    
}
