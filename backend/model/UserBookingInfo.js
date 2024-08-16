const mongoose = require("mongoose");

const UserBookingInfo = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  showTimeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Showtime",
    required: true,
  },
  bookingInfoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BookingInfo",
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
  bookedSeat: {
    type: [],
    required: true,
  },
});
module.exports = mongoose.model("UserBookingInfo", UserBookingInfo);
