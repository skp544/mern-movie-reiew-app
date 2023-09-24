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
