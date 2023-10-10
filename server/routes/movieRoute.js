const express = require("express");

// middlewares
const { isAuth, isAdmin } = require("../middlewares/auth");
const { uploadVideo, uploadImage } = require("../middlewares/multer");
const {
  validateMovie,
  validate,
  validateTrailer,
} = require("../middlewares/validator");

// controllers
const {
  uploadTrailer,
  updateWithoutPoster,
  createMovie,
  updateMovie,
  removeMovie,
  getMovies,
  getMovieForUpdate,
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
  validateTrailer,
  validate,
  createMovie
);

// router.patch(
//   "/update-movie-without-poster/:movieId",
//   isAuth,
//   isAdmin,
//   validateMovie,
//   validate,
//   updateWithoutPoster
// );

router.patch(
  "/update/:movieId",
  isAuth,
  isAdmin,
  uploadImage.single("poster"),
  parseData,
  validateMovie,
  validate,
  updateMovie
);
router.get("/for-update/:movieId", isAuth, isAdmin, getMovieForUpdate);

router.get("/movies", isAuth, isAdmin, getMovies);

router.delete("/:movieId", isAuth, isAdmin, removeMovie);
module.exports = router;
