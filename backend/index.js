const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const UserRoute = require("./routes/userRoutes");
const MovieRoute = require("./routes/movieRoutes");
const User = require("./model/UserModel");

const jwt = require("jsonwebtoken");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
dotenv.config();
const getUserInfo = async (req, res, next) => {
  const cookies = req.cookies;
  // console.log("Cookies:  ", cookies);
  if (!cookies) {
    next();
  } else {
    const token = cookies.jwt;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      // console.log(decoded);
      {
        if (err || decoded == undefined || decoded == null) {
          // console.log("Noving to next");
          return next();
        }
        const foundUser = await User.findById(decoded.userId);
        // console.log(foundUser);
        let user = {
          name: foundUser.name,
          role: foundUser.role,
          isLogged: true,
          userId: foundUser._id,
        };
        if (!foundUser) {
          next();
        }
        // console.log(user);
        req.body = { ...req.body, user: user };
        // console.log(req.body);
        return next();
      }
    });
  }
};
const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(getUserInfo);

app.use("/api", UserRoute);
app.use("/api/movie", MovieRoute);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
