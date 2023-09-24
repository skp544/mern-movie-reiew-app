const { isValidObjectId } = require("mongoose");
const PasswordResetToken = require("../models/passwordResetTokenModel");

exports.isValidPassResetToken = async (req, res, next) => {
  try {
    const { token, userId } = req.body;

    if (!token.trim() || !isValidObjectId(userId)) {
      return res.status(401).json({
        success: false,
        message: "Invalid Request",
      });
    }

    const resetToken = await PasswordResetToken.findOne({ owner: userId });

    if (!resetToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access, Invalid Request!",
      });
    }

    const matched = await resetToken.compareToken(token);

    if (!matched) {
      return res.status(401).json({
        success: false,
        message: "Token Not matched",
      });
    }

    req.resetToken = resetToken;

    next();
  } catch (error) {
    console.log("Error in valid password reset token controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "valid reset token  failed",
    });
  }
};
