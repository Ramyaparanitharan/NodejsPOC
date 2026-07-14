import Booking from "../models/Booking.js";
import Seat from "../models/Seat.js";

export const bookSeats = async (req, res) => {
  try {
    const { eventId, userName, row, number } = req.body;

    console.log("Request:", { eventId, row, number });

    const existingSeat = await Seat.findOne({
      eventId,
      row,
      number
    });

    console.log("Existing seat:", existingSeat);

    // Find and lock the seat only if available
    const seat = await Seat.findOneAndUpdate(
      {
        eventId,
        row,
        number,
        status : "available"
          },
      {
        $set : {
        status: "booked"
        }
      },
      {
        new: true
      }
    );
    console.log("Updated seat", seat);
    if (!seat) {
      return res.status(400).json({
        message: "Seat not available"
      });
    }

    const booking = await Booking.create({
      eventId,
      row: row,
      number : number,
      userName,
      status: "confirmed"
    });

    res.status(201).json({
      message: "Booking successful",
      booking,
      seat
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};