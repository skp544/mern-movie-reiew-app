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

exports.uploadTrailerCloud = async (file) => {
  const res = await cloudinary.uploader.upload(file.path, {
    folder: process.env.CLOUD_FOLDER_NAME,
    resource_type: "video",
  });
  return res;
};

exports.uploadPosterCloud = async (file) => {
  const res = await cloudinary.uploader.upload(file.path, {
    folder: process.env.CLOUD_FOLDER_NAME,
    transformation: {
      width: 1280,
      height: 720,
    },
    responsive_breakpoints: {
      create_derived: true,
      max_width: 640,
      max_images: 3,
    },
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

exports.parseData = (req, res, next) => {
  const { trailer, genres, cast, tags, writers } = req.body;

  if (trailer) {
    req.body.trailer = JSON.parse(trailer);
  }
  if (cast) {
    req.body.cast = JSON.parse(cast);
  }
  if (genres) {
    req.body.genres = JSON.parse(genres);
  }
  if (tags) {
    req.body.tags = JSON.parse(tags);
  }
  if (writers) {
    req.body.writers = JSON.parse(writers);
  }
  next();
};
