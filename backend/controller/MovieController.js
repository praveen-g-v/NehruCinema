const AWS = require("aws-sdk");
const multer = require("multer");
const Movie = require("../model/movieModel");
const Showtime = require("../model/ShowTimeModel");

const addMovie = async (req, res) => {
  const valiadateData = () => {
    console.log("Validating Data");
    if (req.body.title.length > 0) {
      if (req.body.genre.length > 0) {
        if (req.body.synopsis.length > 20) {
          if (req.body.cast.length > 0) {
            req.body.cast.forEach((val) => {
              if (val.length < 0) {
                return res.status(304).send("Please enter valid cast");
              }
            });
            if (req.body.crew.length > 0) {
              req.body.crew.forEach((val) => {
                if (val.length < 0) {
                  return res.status(304).send("Please enter valid crew");
                }
              });
              if (req.body.ageRestriction.length > 0) {
                if (req.body.poster != null) {
                  return true;
                } else {
                  return res.status(304).send("Please Upload the poster");
                }
              } else {
                return res.status(304).send("Please choice age restriction");
              }
            } else {
              return res.status(304).send("Please add a crew");
            }
          } else {
            return res.status(304).send("Please add a cast");
          }
        } else {
          return res.status(304).send("Please enter a synopsis");
        }
      } else {
        return res.status(304).send("Please enter a genre");
      }
    } else {
      return res.status(304).send("Please enter a title");
    }
    return false;
  };
  const file = req.file; // Access the file object from Multer
  console.log(req.body);
  AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  });
  const s3 = new AWS.S3();
  if (!file) {
    return res.status(400).json({ message: "No image uploaded!" });
  }
  console.log(file.buffer);

  const params = {
    Bucket: "ncimage", // Replace with your bucket name
    Key: file.filename || `image-${Date.now()}`, // Or generate a unique filename
    Body: file.buffer, // Ensure you're using the correct property for the image data
    ContentType: file.mimetype,
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    const imageUrl = uploadResult.Location;
    const newCrew = req.body.crew.split(",");
    const newCast = req.body.cast.split(","); // Get the uploaded image URL
    if (imageUrl) {
      const newMovie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        duration: req.body.duration,
        synopsis: req.body.synopsis,
        cast: newCast,
        crew: newCrew,
        poster: imageUrl,
      });
      await newMovie.save();
      return res.send({ message: "Successfully Added" });
    }
    res.json({ message: "Image uploaded successfully!", url: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed!" });
  }
};

const getMovies = async (req, res) => {
  const Movies = await Movie.find({});
  if (Movies.length > 0) {
    let moviesList = [];
    Movies.forEach((val) => {
      moviesList = [
        ...moviesList,
        {
          id: val._id,
          title: val.title,
          duration: val.duration,
        },
      ];
    });
    return res.status(200).send(moviesList);
  } else {
    return res.status(304).send({ message: "No movies are found" });
  }
};

const addShowTime = async (req, res) => {
  let { movieId, date, time, theatreHall, availableSeats } = req.body;
  if (movieId.length > 0) {
    if (date.length > 0) {
      if (time.length > 0) {
        if (availableSeats > 0) {
        } else {
          return res.status(304).send({
            message: "available seat is less than 0",
          });
        }
      } else {
        return res.status(304).send({
          message: "time is not valid",
        });
      }
    } else {
      return res.status(304).send({
        message: "date is not valid",
      });
    }
  } else {
    return res.status(304).send({
      message: "movie is not valid",
    });
  }
  date = new Date(date);
  try {
    const newShowtime = new Showtime({
      movieId,
      date,
      time,
      theatreHall,
      availableSeats,
    });

    await newShowtime.save();
    res.status(200).send({ message: "Showtime created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

exports.addMovie = addMovie;
exports.getMovies = getMovies;
exports.addShowTime = addShowTime;
