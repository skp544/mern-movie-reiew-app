const { check, validationResult } = require("express-validator");

exports.userValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is Missing"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is Missing")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be altleast 8 characters long"),
];

exports.validatePassword = [
  check("newPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is Missing")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be altleast 8 characters long"),
];

exports.signInValidator = [
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password").trim().not().isEmpty().withMessage("Password is Missing"),
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();

  if (error.length) {
    return res.status(400).json({
      success: false,
      message: error[0].msg,
    });
  }

  next();
};

// var transport = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "e0e6766fed9f1c",
//       pass: "6629806f3ead70"
//     }
//   });
