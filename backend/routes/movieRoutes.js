const express = require("express");
const router = express.Router();
const MovieController = require("../controller/MovieController");

const multer = require("multer");

const upload = multer(); // Optional: Set temporary storage directory

router.get("/getmovies", MovieController.getMovies);
router.get("/getshowtime", MovieController.getShowTime);

router.post("/addmovie", upload.single("poster"), MovieController.addMovie);
router.post("/addshowtime", MovieController.addShowTime);
module.exports = router;
