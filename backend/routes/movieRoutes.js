const express = require("express");
const router = express.Router();
const MovieController = require("../controller/MovieController");

const multer = require("multer");

const upload = multer(); // Optional: Set temporary storage directory

router.post("/addmovie", upload.single("poster"), MovieController.addMovie);

module.exports = router;
