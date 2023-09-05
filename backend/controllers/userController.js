const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        error: "Please input all mandatory fields",
      });
    }
    const existingUserWithEmail = await User.findOne({ email });
    if (existingUserWithEmail) {
      res.status(400).json({
        error: "User with this email exists already",
      });
    }
    //Use bcrypt from npm to hash the password before storing in db
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      name,
      email,
      password: hashedPassword,
      pic,
    });
    res.status(201).json(createdUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while registering new user",
      err,
    });
  }
};

const loginUser = async (req, res) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Please input all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(401).json({ error: "Invalid credentials" });
    }

    //create a token using payload, secret key and options
    let token = jwt.sign({ name: user.name, _id: user._id }, secretKey, {
      expiresIn: "3d",
    });
    const userWithToken = {
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    };
    //send the token to client for further calls
    res.status(200).json({
      user: userWithToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while logging in",
      err,
    });
  }
};

module.exports = { registerUser, loginUser };
