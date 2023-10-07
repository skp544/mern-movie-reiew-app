const { isValidObjectId } = require("mongoose");
const Movie = require("../models/movieModel");
const { uploadPosterCloud } = require("../utils/helper");

exports.createMovie = async (req, res) => {
  try {
    const { file, body } = req;

    const {
      title,
      storyline,
      director,
      releaseDate,
      status,
      type,
      genres,
      tags,
      cast,
      writers,
      trailer,
      language,
    } = body;

    // creating a new movie
    const newMovie = new Movie({
      title,
      storyline,
      releaseDate,
      status,
      type,
      genres,
      tags,
      cast,
      trailer,
      language,
    });

    // adding director if present
    if (director) {
      if (!isValidObjectId(director)) {
        return res.status(401).json({
          success: false,
          message: "Invalid Director id",
        });
      }

      newMovie.director = director;
    }

    // adding writers if present
    if (writers) {
      for (let writerId of writers) {
        if (!isValidObjectId(writerId)) {
          return res.status(401).json({
            success: false,
            message: "Invalid writer id",
          });
        }
      }
      newMovie.writers = writers;
    }

    // uploading poster only if present

    if (file) {
      const {
        secure_url: url,
        public_id,
        responsive_breakpoints,
      } = await uploadPosterCloud(file);

      const posterObj = {
        url,
        public_id,
        reponsive: [],
      };

      const { breakpoints } = responsive_breakpoints[0];

      if (breakpoints.length) {
        for (let imgObj of breakpoints) {
          const { secure_url } = imgObj;
          posterObj.reponsive.push(secure_url);
        }
      }

      // adding posterObj
      newMovie.poster = posterObj;
    }

    // saving movie
    await newMovie.save();

    return res.status(201).json({
      success: true,
      message: "Movie created Successfully",
      movie: {
        id: newMovie._id,
        title,
      },
    });
  } catch (error) {
    console.log("Error in create movie controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Movie not created",
    });
  }
};
