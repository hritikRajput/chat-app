const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  searchUsers,
} = require("../controllers/userController");
const { requireAuth } = require("../middlewares/requireAuth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(requireAuth, searchUsers);

module.exports = router;
