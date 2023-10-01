const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;

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

exports.uploadActor = async (file) => {
  const res = await cloudinary.uploader.upload(file.path, {
    folder: process.env.CLOUD_FOLDER_NAME,
    gravity: "face",
    height: 500,
    width: 500,
    crop: "thumb",
  });
  return res;
};

exports.formatActor = (actor) => {
  const { name, gender, about, _id, avatar } = actor;

  return {
    id: _id,
    name,
    about,
    gender,
    avatar: avatar?.url,
  };
};
