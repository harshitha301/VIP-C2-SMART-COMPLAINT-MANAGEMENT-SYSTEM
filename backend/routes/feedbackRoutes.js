const express = require("express");
const router = express.Router();

const {
  createFeedback,
  getAllFeedbacks,
} = require("../controllers/feedbackController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.post("/", protect, createFeedback);

router.get("/", protect, getAllFeedbacks);

module.exports = router;