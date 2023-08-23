const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register user
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: "please add all fields" });
  }

  const userExist = await User.findOne({ name });
  if (userExist) {
    res.status(400).json({ message: "user already exixt" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    // token: generateToken(user._id),
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "invalid user data" });
  }
});

const login = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "invalid user data" });
  }
});

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//generate a jwt token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SEC, { expiresIn: "30d" });
};

module.exports = {
  register,
  login,
  getMe,
};