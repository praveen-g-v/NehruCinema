const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");

// Optional: Set temporary storage directory
router.post("/register", userController.register);
router.get("/logout", userController.logout);
router.get("/login", userController.login);
module.exports = router;
