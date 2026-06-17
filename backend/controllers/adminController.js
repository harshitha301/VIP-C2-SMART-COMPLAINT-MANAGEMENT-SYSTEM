const Complaint = require("../models/Complaint");
const User = require("../models/User");
const Feedback = require("../models/Feedback");

// Get All Complaints
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name email");

    res.json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Complaint Status
const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findById(
      req.params.id
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    await Complaint.findByIdAndUpdate(
  req.params.id,
  { status },
  { new: true }
);

    res.json({
      message: "Complaint status updated",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Delete Complaint
const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(
      req.params.id
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    await complaint.deleteOne();

    res.json({
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Analytics
const getAnalytics = async (req, res) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const totalComplaints =
      await Complaint.countDocuments();

    const resolvedComplaints =
      await Complaint.countDocuments({
        status: "Resolved",
      });

    const pendingComplaints =
      await Complaint.countDocuments({
        status: { $ne: "Resolved" },
      });
const highPriority =
  await Complaint.countDocuments({
    priority: "High",
  });

const mediumPriority =
  await Complaint.countDocuments({
    priority: "Medium",
  });

const lowPriority =
  await Complaint.countDocuments({
    priority: "Low",
  });
  const electricityComplaints =
  await Complaint.countDocuments({
    category: "Electricity",
  });

const waterComplaints =
  await Complaint.countDocuments({
    category: "Water",
  });

const cleanlinessComplaints =
  await Complaint.countDocuments({
    category: "Cleanliness",
  });

const networkComplaints =
  await Complaint.countDocuments({
    category: "Network",
  });
    const totalFeedbacks =
      await Feedback.countDocuments();

    res.json({
  totalUsers,
  totalComplaints,
  resolvedComplaints,
  pendingComplaints,
  totalFeedbacks,

  highPriority,
  mediumPriority,
  lowPriority,

  electricityComplaints,
  waterComplaints,
  cleanlinessComplaints,
  networkComplaints,
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
  getAnalytics,
};