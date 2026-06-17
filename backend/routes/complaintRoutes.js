const express = require("express");

const router = express.Router();

const {
  createComplaint,
  getMyComplaints,
} = require("../controllers/complaintController");

const {
  protect,
} = require("../middleware/authMiddleware");

// Create Complaint
router.post("/", protect, createComplaint);

// Get Logged-in User Complaints
router.get("/my", protect, getMyComplaints);

module.exports = router;