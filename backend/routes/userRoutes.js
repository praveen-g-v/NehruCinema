const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const authenticateToken = require("../jwtAuthentication");

router.post("/register", userController.register);
router.get("/logout", userController.logout);
router.get("/login", userController.login);
module.exports = router;
