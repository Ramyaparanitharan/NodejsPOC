import express from "express";
import mongoose from "mongoose";

const router = express.Router();
router.get("/",
    async(req,res)=>{
        const tickets = await mongoose.connection.db
                        .collection("tickets")
                        .find({})
                        .toArray()
        console.log(res.json(tickets))
    }
)
router.post("/", async (req, res) => {
    try {
        const { showname, ticketcount } = req.body;

        const collection = mongoose.connection.db.collection("tickets");

        // Find the show
        const show = await collection.findOne({
            show_name: showname
        });

        if (!show) {
            return res.status(404).json({
                message: "Show not found"
            });
        }

        // Check availability
        if (show.ticket_availability < ticketcount) {
            return res.status(400).json({
                message: "Not enough tickets available",
                availableTickets: show.ticket_availability
            });
        }

        // Calculate remaining tickets
        const remainingTickets = show.ticket_availability - ticketcount;

        // Update database
        await collection.updateOne(
            { show_name: showname },
            {
                $set: {
                    ticket_availability: remainingTickets
                }
            }
        );

        res.json({
            message: "Tickets booked successfully",
            show: showname,
            bookedTickets: ticketcount,
            remainingTickets: remainingTickets
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Booking failed"
        });
    }
});

export default router;