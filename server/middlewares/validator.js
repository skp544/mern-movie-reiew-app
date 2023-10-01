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

exports.actorInfoValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is Missing"),
  check("about").trim().not().isEmpty().withMessage("About is required field"),
  check("gender").trim().not().isEmpty().withMessage("Gender is requird field"),
];
