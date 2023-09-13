const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password || !pic) {
      return res.status(400).json({
        error: "Please input all mandatory fields",
      });
    }
    const existingUserWithEmail = await User.findOne({ email });
    if (existingUserWithEmail) {
      return res.status(400).json({
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
    return res.status(201).json(createdUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
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
      return res.status(400).json({ error: "Please input all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid credentials" });
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
    return res.status(200).json({
      user: userWithToken,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "An error occurred while logging in",
      err,
    });
  }
};

const searchUsers = async (req, res) => {
  try {
    //check if req.query has search parameter
    //if yes then use mongodb logical operator with regex to search for that and assign to keyword
    //if no assign {} to keyword
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    // Using that keyword object find all the users with matching name and email
    //Use mongodb comparison query operator to filter the user which have _id equal to current user's _id
    //req.user._id is coming from requireAuth middleware
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    return users
      ? res.status(200).json(users)
      : res.status(404).json({ error: "No data found" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "An error occured while searching for user",
      err,
    });
  }
};

module.exports = { registerUser, loginUser, searchUsers };
