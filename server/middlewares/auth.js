const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuth = async (req, res, next) => {
  const token = req.headers?.authorization;
  const jwtToken = token.split("Bearer ")[1];

  if (!jwtToken) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }

  //   verifying token
  const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);

  const { userId } = decode;

  //   finding user
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid Token User not found",
    });
  }

  req.user = user;
  next();
};
