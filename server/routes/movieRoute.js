const express = require("express");

// middlewares
const { isAuth, isAdmin } = require("../middlewares/auth");
const { uploadVideo, uploadImage } = require("../middlewares/multer");
const { validateMovie, validate } = require("../middlewares/validator");

// controllers
const {
  uploadTrailer,
  updateWithoutPoster,
  createMovie,
  updateWithPoster,
  removeMovie,
} = require("../controllers/movieController");

// helper functions
const { parseData } = require("../utils/helper");

const router = express.Router();

// routes
router.post(
  "/upload-trailer",
  isAuth,
  isAdmin,
  uploadVideo.single("video"),
  uploadTrailer
);

router.post(
  "/create",
  isAuth,
  isAdmin,
  uploadImage.single("poster"),
  parseData,
  validateMovie,
  validate,
  createMovie
);

router.patch(
  "/update-movie-without-poster/:movieId",
  isAuth,
  isAdmin,
  // parseData,
  validateMovie,
  validate,
  updateWithoutPoster
);

router.patch(
  "/update-movie-with-poster/:movieId",
  isAuth,
  isAdmin,
  uploadImage.single("poster"),
  parseData,
  validateMovie,
  validate,
  updateWithPoster
);

router.delete(
  "/:movieId",
  isAuth,
  isAdmin,
  // uploadImage.single("poster"),
  // parseData,
  // validateMovie,
  // validate,
  removeMovie
);
module.exports = router;
