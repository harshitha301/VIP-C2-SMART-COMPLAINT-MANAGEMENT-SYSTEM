const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
console.log("DECODED =", decoded);
req.user = await User.findById(decoded.id).select("-password");

console.log("USER =", req.user);

next();
    } catch (error) {
      res.status(401).json({
        message: "Not Authorized",
      });
    }
  }

  if (!token) {
    res.status(401).json({
      message: "No Token Found",
    });
  }
};

module.exports = { protect };