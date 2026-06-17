const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
 
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
  type: String,
  required: true,
  enum: [
    "Electricity",
    "Water",
    "Network",
    "Cleanliness",
  ],
},

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
image: {
  type: String,
  default: "",
},

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);