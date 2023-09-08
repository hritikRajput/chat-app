const express = require("express");
const { requireAuth } = require("../middlewares/requireAuth");
const {
  sendMessage,
  getAllMessages,
} = require("../controllers/messageController");

const router = express.Router();

router.route("/").post(requireAuth, sendMessage);
router.route("/:chatId").get(requireAuth, getAllMessages);

module.exports = router;
