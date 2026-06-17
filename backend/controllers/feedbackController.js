const Feedback = require("../models/Feedback");

const createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create({
      complaint: req.body.complaint,
      user: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("user", "name email")
      .populate("complaint", "title");

    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createFeedback,
  getAllFeedbacks,
};