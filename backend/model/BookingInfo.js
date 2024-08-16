const mongoose = require("mongoose");
const UserBookingInfo = require("./UserBookingInfo");

const BookingInfo = new mongoose.Schema({
  showTimeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Showtime",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  theatreHall: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TheatreHall",
    required: true,
  },
  bookedSeats: {
    type: [],
    required: true,
  },
  UserBookingInfo: {
    type: [],
  },
  totalBookedSeats: {
    type: Number,
    required: true,
  },
  totalSeats: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("BookingInfo", BookingInfo);
