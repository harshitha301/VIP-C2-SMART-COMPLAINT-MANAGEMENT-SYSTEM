const User = require("../models/User");
const Complaint = require("../models/Complaint");
const Feedback = require("../models/Feedback");

const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalComplaints =
      await Complaint.countDocuments();

    const resolvedComplaints =
      await Complaint.countDocuments({
        status: "Resolved",
      });

    const pendingComplaints =
      await Complaint.countDocuments({
        status: "Pending",
      });

    const totalFeedbacks =
      await Feedback.countDocuments();

    res.json({
      totalUsers,
      totalComplaints,
      resolvedComplaints,
      pendingComplaints,
      totalFeedbacks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAnalytics,
};