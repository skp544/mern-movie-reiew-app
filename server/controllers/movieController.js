// models
const Movie = require("../models/movieModel");
const cloudinary = require("cloudinary").v2;
const { isValidObjectId } = require("mongoose");

// helper function
const { uploadTrailerCloud, uploadPosterCloud } = require("../utils/helper");

exports.uploadTrailer = async (req, res) => {
  try {
    const { file } = req;

    // checking file present or not
    if (!file) {
      return res.status(401).json({
        success: false,
        message: "Video file is missing",
      });
    }

    // uploading image to cloud
    const { secure_url: url, public_id } = await uploadTrailerCloud(file);

    return res.status(201).json({
      success: true,
      message: "Trailer uploaded successfully",
      response: {
        url,
        public_id,
      },
    });
  } catch (error) {
    console.log("Error in upload trailer controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Trailer not uploaded",
    });
  }
};

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

    // uploading poster
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

    // adding movie poster resolution breakpoints
    const { breakpoints } = responsive_breakpoints[0];

    if (breakpoints.length) {
      for (let imgObj of breakpoints) {
        const { secure_url } = imgObj;
        posterObj.reponsive.push(secure_url);
      }
    }

    // adding posterObj
    newMovie.poster = posterObj;

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

exports.updateWithoutPoster = async (req, res) => {
  try {
    const { movieId } = req.params;

    if (!isValidObjectId(movieId)) {
      return res.status(401).json({
        success: false,
        message: "Invalid Movie ID!",
      });
    }

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

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
    } = req.body;

    movie.title = title;
    movie.storyline = storyline;
    movie.releaseDate = releaseDate;
    movie.status = status;
    movie.type = type;
    movie.genres = genres;
    movie.tags = tags;
    movie.cast = cast;
    movie.trailer = trailer;
    movie.language = language;

    if (director) {
      if (!isValidObjectId(director)) {
        return res.status(401).json({
          success: false,
          message: "Invalid Director ID!",
        });
      }

      movie.director = director;
    }

    if (writers) {
      for (let writerId of writers) {
        if (!isValidObjectId(writerId)) {
          return res.status(401).json({
            success: false,
            message: "Invalid Writer ID!",
          });
        }
      }
      movie.writers = writers;
    }

    await movie.save();

    return res.status(201).json({
      success: true,
      message: "Movie Updated Successfully",
      movie,
    });
  } catch (error) {
    console.log("Error in update without poster movie controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Movie not updated",
    });
  }
};

exports.updateWithPoster = async (req, res) => {
  try {
    const { movieId } = req.params;

    if (!isValidObjectId(movieId)) {
      return res.status(401).json({
        success: false,
        message: "Invalid Movie ID!",
      });
    }

    if (!req.file) {
      return res.status(401).json({
        success: false,
        message: "Movie poster is missing!",
      });
    }

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

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
    } = req.body;

    movie.title = title;
    movie.storyline = storyline;
    movie.releaseDate = releaseDate;
    movie.status = status;
    movie.type = type;
    movie.genres = genres;
    movie.tags = tags;
    movie.cast = cast;
    movie.trailer = trailer;
    movie.language = language;

    if (director) {
      if (!isValidObjectId(director)) {
        return res.status(401).json({
          success: false,
          message: "Invalid Director ID!",
        });
      }

      movie.director = director;
    }

    if (writers) {
      for (let writerId of writers) {
        if (!isValidObjectId(writerId)) {
          return res.status(401).json({
            success: false,
            message: "Invalid Writer ID!",
          });
        }
      }
      movie.writers = writers;
    }

    // removing poster from cloud
    const publicId = movie.poster?.public_id;

    if (publicId) {
      const { result } = await cloudinary.uploader.destroy(publicId);

      if (result !== "ok") {
        return res.status(401).json({
          success: false,
          message: "Could not update poster at the moment!",
        });
      }
    }

    const {
      secure_url: url,
      public_id,
      responsive_breakpoints,
    } = await uploadPosterCloud(req.file);

    const posterObj = {
      url,
      public_id,
      reponsive: [],
    };

    // adding movie poster resolution breakpoints
    const { breakpoints } = responsive_breakpoints[0];

    if (breakpoints.length) {
      for (let imgObj of breakpoints) {
        const { secure_url } = imgObj;
        posterObj.reponsive.push(secure_url);
      }
    }

    // adding posterObj
    movie.poster = posterObj;

    await movie.save();

    return res.status(201).json({
      success: true,
      message: "Movie Updated Successfully with poster",
      movie,
    });
  } catch (error) {
    console.log("Error in update with poster movie controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Movie not updated",
    });
  }
};

exports.removeMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    if (!isValidObjectId(movieId)) {
      return res.status(401).json({
        success: false,
        message: "Invalid Movie ID!",
      });
    }

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    // check if there is poster or not

    // if yes we need to delete

    const posterId = movie.poster?.public_id;

    if (posterId) {
      const { result } = await cloudinary.uploader.destroy(posterId);

      if (result !== "ok") {
        return res.status(401).json({
          success: false,
          message: "Could not remove poster from cloud!",
        });
      }
    }

    const trailerId = movie.trailer?.public_id;

    if (!trailerId) {
      return res.status(401).json({
        success: false,
        message: "could not find trailer in cloud!",
      });
    }

    const { result } = await cloudinary.uploader.destroy(trailerId, {
      resource_type: "video",
    });

    if (result !== "ok") {
      return res.status(401).json({
        success: false,
        message: "Could not remove trailer from cloud!",
      });
    }

    await Movie.findByIdAndDelete(movieId);

    return res.status(201).json({
      success: true,
      message: "Movie Deleted Successfully",
    });
  } catch (error) {
    console.log("Error in removie movie controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Movie not removed",
    });
  }
};
