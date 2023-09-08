const express = require("express");
const { requireAuth } = require("../middlewares/requireAuth");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatController");

const router = express.Router();

router.route("/").post(requireAuth, accessChat);
router.route("/").get(requireAuth, fetchChats);
router.route("/group").post(requireAuth, createGroupChat);
router.route("/group/rename").put(requireAuth, renameGroup);
router.route("/group/add").put(requireAuth, addToGroup);
router.route("/group/remove").put(requireAuth, removeFromGroup);

module.exports = router;
