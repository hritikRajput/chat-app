const express = require("express");
const { requireAuth } = require("../middlewares/requireAuth");
const { accessChat, fetchChats } = require("../controllers/chatController");

const router = express.Router();

router.route("/").post(requireAuth, accessChat);
router.route("/").get(requireAuth, fetchChats);

module.exports = router;
