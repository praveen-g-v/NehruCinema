const express = require("express");
const router = express.Router();
const MovieController = require("../controller/MovieController");
const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");

const multer = require("multer");

const upload = multer(); // Optional: Set temporary storage directory

router.get("/getmovies", MovieController.getMovies);
router.get("/getshowtime", MovieController.getShowTime);
router.get("/gettheatrehall", MovieController.getTheatreHall);
router.get("/getTodayShows", MovieController.getTodayShows);
router.get("/getTomorrowShows", MovieController.getTomorrowShows);
router.get("/getAvailablSeats", MovieController.getAvailablSeats);
router.get("/getBookingInfo", MovieController.getBookingInfo);
router.get("/getMyBookings", MovieController.getMyBookings);

router.post("/addmovie", upload.single("poster"), MovieController.addMovie);
router.post("/addshowtime", MovieController.addShowTime);
router.post("/addtheatrehall", MovieController.addtheatreHall);
router.post("/bookTicket", MovieController.bookTicket);

module.exports = router;
