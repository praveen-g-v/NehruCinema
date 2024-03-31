const AWS = require("aws-sdk");
const multer = require("multer");
const Movie = require("../model/movieModel");

const addMovie = async (req, res) => {
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

exports.addMovie = addMovie;
