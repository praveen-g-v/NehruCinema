const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  cast: {
    type: [],
    required: true,
  },
  crew: {
    type: [],
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
