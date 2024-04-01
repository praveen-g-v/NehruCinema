const mongoose = require("mongoose");

const showtimeSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
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
    type: String,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Showtime", showtimeSchema);
