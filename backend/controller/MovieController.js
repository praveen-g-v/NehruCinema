const AWS = require("aws-sdk");
const multer = require("multer");
const Movie = require("../model/movieModel");
const Showtime = require("../model/ShowTimeModel");
const TheatreHall = require("../model/TheatreHallModel");
const { default: mongoose } = require("mongoose");
const BookingInfo = require("../model/BookingInfo");
const UserBookingInfo = require("../model/UserBookingInfo");

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

const getTomorrowShows = async (req, res) => {
  try {
    var moviesList = [];
    let finalData = [];
    var noMovies = true;
    // console.log("Shows");
    const Movies = await Showtime.find({});
    const movieData = await Movie.find({});
    // console.log(Movies);
    if (Movies.length > 0 && movieData.length > 0) {
      // console.log;

      const currDate = new Date();
      Movies.forEach(async (val) => {
        // console.log(val);
        let movieDate = new Date(val.date);
        if (
          currDate.getFullYear() === movieDate.getFullYear() &&
          currDate.getMonth() === movieDate.getMonth() &&
          currDate.getDate() === movieDate.getDate()
        ) {
          movieData.forEach((element) => {
            // console.log(element._id === val.movieId);
            // console.log(element._id + "  " + val.movieId);
            if (element._id.toString() == val.movieId.toString()) {
              noMovies = false;
              moviesList = [
                ...moviesList,
                {
                  id: val._id,
                  movieId: val.movieId,
                  title: element.title,
                  genre: element.genre,
                  duration: element.duration,
                  synopsis: element.synopsis,
                  cast: element.cast,
                  crew: element.crew,
                  poster: element.poster,
                  date: val.date,
                  theatreHall: val.theatreHall,
                },
              ];
            }
          });
        }
        // console.log(moviesList);
      });
      // console.log(finalData);
      if (moviesList.length > 0) {
        // console.log(moviesList);
        return res.status(200).send(moviesList);
      }
    }
    if (noMovies) {
      return res.status(404).send({ message: "No movies are Airing Today" });
    }
  } catch (e) {
    return res.status(500).send({
      message: "Encounterned issue please connect with Adminsitartor",
    });
  }
};

const getTodayShows = async (req, res) => {
  try {
    var moviesList = [];
    let finalData = [];
    var noMovies = true;
    // console.log("Shows");
    const Movies = await Showtime.find({});
    const movieData = await Movie.find({});
    // console.log(Movies);
    if (Movies.length > 0 && movieData.length > 0) {
      // console.log;

      const currDate = new Date();
      Movies.forEach(async (val) => {
        let movieDate = new Date(val.date);
        if (
          currDate.getFullYear() === movieDate.getFullYear() &&
          currDate.getMonth() === movieDate.getMonth() &&
          currDate.getDate() === movieDate.getDate()
        ) {
          movieData.forEach((element) => {
            // console.log(element._id === val.movieId);
            // console.log(element._id + "  " + val.movieId);
            if (element._id.toString() == val.movieId.toString()) {
              noMovies = false;
              moviesList = [
                ...moviesList,
                {
                  id: val._id,
                  movieId: val.movieId,
                  title: element.title,
                  genre: element.genre,
                  duration: element.duration,
                  synopsis: element.synopsis,
                  cast: element.cast,
                  crew: element.crew,
                  poster: element.poster,
                  date: val.date,
                },
              ];
            }
          });
        }
        // console.log(moviesList);
      });
      // console.log(finalData);
      if (moviesList.length > 0) {
        // console.log(moviesList);
        return res.status(200).send(moviesList);
      }
    }
    if (noMovies) {
      return res.status(404).send({ message: "No movies are Airing Today" });
    }
  } catch (e) {
    return res.status(500).send({
      message: "Encounterned issue please connect with Adminsitartor",
    });
  }
};

const addShowTime = async (req, res) => {
  console.log(req.body);
  let { movieId, date, time, theatreHall, availableSeats } = req.body;

  if (movieId.length > 0) {
    if (date.length > 0) {
      if (time.length > 0) {
        if (availableSeats > 0) {
          let currentDate = new Date();
          let showDate = new Date(date);
          if (currentDate >= showDate) {
          } else {
            return res
              .status(304)
              .send({ message: "Show time cannot be past dates" });
          }
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
  const theatre = await TheatreHall.findById(req.body.theatreHall);
  var seatLayout = theatre.layout.map((val) => {
    return val.map((item) => {
      let newItem = { ...item };
      if (item.attribute == "seats") {
        newItem.status = "NotBooked";
        newItem.eligible = true;
        newItem.seatBooked = false;
      } else {
        newItem.status = "NotBookable";
        newItem.eligible = false;
        newItem.seatBooked = false;
      }
      return newItem;
    });
  });
  console.log(seatLayout);
  console.log("Got awway from error");
  try {
    const newShowtime = new Showtime({
      movieId,
      date,
      time,
      theatreHall,
      availableSeats,
    });
    const bookinfInfo = new BookingInfo({
      date: date,
      time: time,
      theatreHall: theatreHall,
      bookedSeats: seatLayout,
      totalBookedSeats: 0,
      totalSeats: availableSeats,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newShowtime.save();
    console.log(newShowtime);
    bookinfInfo.showTimeId = newShowtime._id;
    await bookinfInfo.save();
    console.log(bookinfInfo);
    await session.commitTransaction();
    res.status(200).send({ message: "Showtime created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

const getBookingInfo = async (req, res) => {
  console.log(req.query);
  const BookingInfoData = await BookingInfo.findById(req.query.bookingInfoId);
  if (BookingInfoData != undefined && BookingInfoData != null) {
    const tempData = {
      bookingInfoId: req.query.bookingInfoId,
      showTimeId: req.query.showTimeId,
      bookedSeats: BookingInfoData.bookedSeats,
      date: BookingInfoData.date,
      time: BookingInfoData.time,
      totalSeats: BookingInfoData.totalSeats,
      totalBookedSeats: BookingInfoData.totalBookedSeats,
    };
    return res.status(200).send({ ...tempData });
  }
  return res.status(300).send({ message: "Unable to find ShowTimes" });
};

const getAvailablSeats = async (req, res) => {
  const reqShowTimeId = req.query.bookingId;
  const BookingInfoData = await BookingInfo.find({ showTimeId: reqShowTimeId });
  console.log(BookingInfoData);
  if (BookingInfoData.length > 0) {
    let temp = BookingInfoData[0];
    let currData = {
      BookingInfoId: temp._id,
      showTimeId: reqShowTimeId,
      totalSeats: temp.totalSeats,
      availableSeats: temp.totalSeats - temp.totalBookedSeats,
    };
    return res.status(200).send({ ...currData });
  }
  return res.status(300).send({ message: "Unable to Retrive Seats" });
};
const getShowTime = async (req, res) => {
  const showTimes = await Showtime({});
  let response = [];
  showTimes.forEach((val) => {
    response = [
      ...response,
      {
        movieId: val.movieId,
        date: val.date,
        time: val.time,
        theatreHall: val.theatreHall,
        availableSeats: val.availableSeats,
        id: val._id,
      },
    ];
  });
  if (response.length > 0) {
    return res.status(200).send(response);
  }
  return res.status(300).send({ message: "Unable to find ShowTimes" });
};

const getMyBookings = async (req, res) => {
  console.log(req.body);
  try {
    const userId = req.body.user.userId;
    const userBookingInfoData = await UserBookingInfo.find({ userId: userId });
    if (userBookingInfoData.length > 0) {
      console.log(userBookingInfoData);
      let currBookings = [];
      for (let i = 0; i < userBookingInfoData.length; i++) {
        let showTimeData = await Showtime.findById(
          userBookingInfoData[i].showTimeId
        );
        if (showTimeData != undefined && showTimeData != null) {
          console.log(showTimeData);
          let movieData = await Movie.findById(showTimeData.movieId);
          let theatreHallDetail = await TheatreHall.findById(
            showTimeData.theatreHall
          );
          if (
            movieData != undefined &&
            movieData != null &&
            theatreHallDetail != undefined &&
            theatreHallDetail != null
          ) {
            // console.log(movieData);
            // console.log(theatreHallDetail);
            currBookings = [
              ...currBookings,
              {
                id: userBookingInfoData[i]._id,
                movie: movieData.title,
                genre: movieData.genre,
                duration: movieData.duration,
                date: showTimeData.date,
                time: showTimeData.time,
                synopsis: movieData.synopsis,
                theatreHallName: theatreHallDetail.name,
                location: theatreHallDetail.location,
                seats: userBookingInfoData[i].bookedSeat,
              },
            ];
          }
        }
      }
      return res.status(200).send({ bookings: currBookings });
    } else {
      return res.status(300).send({ message: "Unable to find bookings" });
    }
  } catch (err) {
    return res
      .status(401)
      .send({ message: "Please Login to View Your Booking" });
  }
};
const bookTicket = async (req, res) => {
  // console.log(req.body);
  const { bookingInfoId, showTimeId, selectedSeats, user } = req.body;
  if (user) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      const showTimeData = await Showtime.findById(showTimeId);
      const bookingInfoData = await BookingInfo.findById(bookingInfoId);
      const userBookingInfo = new UserBookingInfo({
        userId: user.userId,
        showTimeId: showTimeId,
        bookingInfoId: bookingInfoId,
        date: new Date(),
        time: new Date().getHours() + ":" + new Date().getMinutes(),
        bookedSeat: [...selectedSeats],
      });
      if (
        showTimeData != undefined &&
        showTimeData != null &&
        bookingInfoData != undefined &&
        bookingInfoData != null
      ) {
        let alreadyBooked = false;
        selectedSeats.forEach((element) => {
          console.log(
            bookingInfoData.bookedSeats[element.i][element.j].seatBooked
          );
          if (bookingInfoData.bookedSeats[element.i][element.j].seatBooked) {
            alreadyBooked = true;
          }
          bookingInfoData.bookedSeats[element.i][element.j].seatBooked = true;
          bookingInfoData.bookedSeats[element.i][element.j].bookedBy =
            userBookingInfo._id;
          // console.log(bookingInfoData.bookedSeats[element.i][element.j]);
        });
        bookingInfoData.totalBookedSeats =
          bookingInfoData.totalBookedSeats + selectedSeats.length;
        bookingInfoData.UserBookingInfo = [
          ...bookingInfoData.UserBookingInfo,
          userBookingInfo._id,
        ];
        // console.log(bookingInfoData);
        // console.log(showTimeData);
        // console.log(userBookingInfo);
        if (alreadyBooked) {
          return res.status(300).send({ message: "Seat is already Booked" });
        }
        await BookingInfo.findByIdAndUpdate(bookingInfoId, bookingInfoData);
        await userBookingInfo.save();
        await session.commitTransaction();
        return res.status(200).send({ message: "The Booking is confirmed" });
      }

      // console.log(newShowtime);
      // bookinfInfo.showTimeId = newShowtime._id;
      // await bookinfInfo.save();
      // console.log(bookinfInfo);
    } catch (err) {}
  }
  return res.status(300).send({ message: "Unable to book Ticket" });
};

const addtheatreHall = async (req, res) => {
  if (
    req.body.hallname &&
    req.body.rowseats &&
    req.body.row &&
    req.body.location
  ) {
    const theatre = new TheatreHall({
      name: req.body.hallname,
      seats: req.body.rowseats,
      row: req.body.row,
      location: req.body.location,
      layout: req.body.layout,
    });
    try {
      theatre.save();
      return res.status(200).send({ message: "Added Successfully" });
    } catch {
      return res.status(300).send({ message: "Unkown error please try again" });
    }
  } else {
    return res.status(300).send({ message: "Soem fields are missing" });
  }
};

const getTheatreHall = async (req, res) => {
  const theatrehall = await TheatreHall.find({});
  if (theatrehall.length > 0) {
    let tempTheatre = theatrehall.map((val) => {
      console.log(val);
      return {
        id: val._id,
        name: val.name,
        totalSeats: val.seats * val.row,
      };
    });
    return res.status(200).send(tempTheatre);
    console.log(tempTheatre);
  }
  return res.status(304).send({ message: "No Theatre Halls are available" });
};

exports.addMovie = addMovie;
exports.getMovies = getMovies;
exports.addShowTime = addShowTime;
exports.getShowTime = getShowTime;
exports.addtheatreHall = addtheatreHall;
exports.getTheatreHall = getTheatreHall;
exports.getTodayShows = getTodayShows;
exports.getTomorrowShows = getTomorrowShows;
exports.getAvailablSeats = getAvailablSeats;
exports.getBookingInfo = getBookingInfo;
exports.bookTicket = bookTicket;
exports.getMyBookings = getMyBookings;
