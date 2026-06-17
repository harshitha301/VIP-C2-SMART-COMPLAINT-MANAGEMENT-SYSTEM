const Complaint = require("../models/Complaint");

// Create Complaint
const createComplaint = async (req, res) => {
  try {
    const {
  title,
  description,
  category,
  priority,
} = req.body;

    const complaint = await Complaint.create({
  title,
  description,
  category,
  priority,
  user: req.user._id,
});
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Logged-in User Complaints
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      user: req.user._id,
    });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
};