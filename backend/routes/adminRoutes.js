const express = require("express");

const router = express.Router();

const {
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
  getAnalytics,
} = require("../controllers/adminController");
const {
  protect,
} = require("../middleware/authMiddleware");

const {
  adminOnly,
} = require("../middleware/roleMiddleware");

// Analytics Route
router.get(
  "/analytics",
  protect,
  adminOnly,
  getAnalytics
);

// Get All Complaints
router.get(
  "/complaints",
  protect,
  adminOnly,
  getAllComplaints
);

// Update Complaint Status
router.put(
  "/complaints/:id",
  protect,
  adminOnly,
  updateComplaintStatus
);
router.delete(
  "/complaints/:id",
  protect,
  adminOnly,
  deleteComplaint
);
module.exports = router;