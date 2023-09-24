const nodemailer = require("nodemailer");

exports.generateOTP = (otp_len = 6) => {
  // generate 6 digit otp
  let OTP = "";

  for (let i = 1; i <= otp_len; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }

  return OTP;
};

exports.generateMailTransporter = () =>
  nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e0e6766fed9f1c",
      pass: "6629806f3ead70",
    },
  });
