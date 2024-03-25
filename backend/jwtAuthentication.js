const jwt = require("jsonwebtoken");
const User = require("./model/UserModel");
const authenticateToken = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).send({ message: "Forbid0den" });
      }
      const checkUser = await User.findById(user.userId);
      console.log(checkUser);
      req.user = checkUser;
      next();
    });
  } catch (err) {
    res.status(403).send({ message: "Server Error unable to verify the user" });
  }
};

module.exports = authenticateToken;
