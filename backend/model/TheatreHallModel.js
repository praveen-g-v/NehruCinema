const mongoose = require("mongoose");

const theatreHallSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  seats: {
    type: String,
    required: true,
  },
  row: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  layout: {
    type: [],
    required: true,
  },
});

module.exports = mongoose.model("TheatreHall", theatreHallSchema);
