const crypto = require("crypto");

//rnadom byte function
exports.generateRandomByte = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) reject(err);
      const bufferString = buff.toString("hex");

      resolve(bufferString);
    });
  });
};

exports.handleNotFound = (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Not Found",
  });
};
