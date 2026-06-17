const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const adminRoutes = require("./routes/adminRoutes");
const feedbackRoutes = require(
  "./routes/feedbackRoutes"
);
const adminAnalyticsRoutes =
require("./routes/adminAnalyticsRoutes");

const connectDB = require("./config/db");


dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);
app.use(
  "/api/feedback",
  feedbackRoutes
);
app.use(
  "/api/admin",
  adminAnalyticsRoutes
);
app.get("/", (req, res) => {
  res.send("Complaint Management System API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});