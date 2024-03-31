const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
// Register user
const register = async (req, res) => {
  // console.log("Register");
  const token = req.cookies.jwt;
  console.log(token);
  console.log("Register", req.body);
  try {
    let { name, email, password, role, mobileNo } = req.body;
    console.log(password);
    // Hash password
    role = role ? role : "user";
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const ifUserExist = await User.find({ email: email });
    if (ifUserExist.length > 0) {
      return res.status(403).send({ message: "User Already Exist" });
    }
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobileNo,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
const login = async (req, res) => {
  console.log("Login", req.query);
  try {
    const { email, password } = req.query;
    console.log(email);
    console.log(password);
    let user = await User.find({ email: email });

    if (user.length == 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    user = user[0];
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 60,
      sameSite: "None",
    });
    res.status(200).send({ message: "Signed Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies) {
    return res.status(204).send();
  }
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "logged out successfully" });
};

exports.register = register;
exports.login = login;
exports.logout = logout;
