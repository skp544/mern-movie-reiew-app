// models
const { isValidObjectId } = require("mongoose");
const Actor = require("../models/actorModel");
const { uploadActor, formatActor } = require("../utils/helper");

// imports
const cloudinary = require("cloudinary").v2;

exports.createActor = async (req, res) => {
  try {
    const { name, about, gender } = req.body;
    const { file } = req;

    const newActor = new Actor({ name, about, gender });

    if (file) {
      const uploadRes = await uploadActor(file);

      const { secure_url, public_id } = uploadRes;

      newActor.avatar = { url: secure_url, public_id };
    }

    await newActor.save();

    return res.status(201).json({
      success: true,
      message: "Actor is created",
      actor: formatActor(newActor),
    });
  } catch (error) {
    console.log("Error in create actor controller");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Actor not created",
    });
  }
};

exports.updateActor = async (req, res) => {
  try {
    const { name, about, gender } = req.body;
    const { file } = req;
    const { actorId } = req.params;

    if (!isValidObjectId(actorId)) {
      return res.status(401).json({
        success: false,
        message: "Invalid Request!",
      });
    }

    const actor = await Actor.findById(actorId);

    if (!actor) {
      return res.status(401).json({
        success: false,
        message: "Invalid Request, Record Not Found!",
      });
    }

    const public_id = actor.avatar.public_id;

    if (public_id && file) {
      const { result } = await cloudinary.uploader.destroy(public_id);
      console.log(result);

      if (result !== "ok") {
        return res.status(401).json({
          success: false,
          message: "Could not remove image from cloud!",
        });
      }
    }

    if (file) {
      const uploadRes = await uploadActor(file);

      const { secure_url, public_id } = uploadRes;

      actor.avatar = { url: secure_url, public_id };
    }

    actor.name = name;
    actor.about = about;
    actor.gender = gender;

    await actor.save();

    return res.status(201).json({
      success: true,
      message: "Actor is updated",
      actor: formatActor(actor),
    });
  } catch (error) {
    console.log("Error in create update actor controller");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Actor not updated",
    });
  }
};

exports.removeActor = async (req, res) => {
  try {
    const { actorId } = req.params;

    if (!isValidObjectId(actorId)) {
      return res.status(401).json({
        success: false,
        message: "Invalid Request!",
      });
    }

    const actor = await Actor.findById(actorId);

    if (!actor) {
      return res.status(401).json({
        success: false,
        message: "Invalid Request, Record Not Found!",
      });
    }

    const public_id = actor.avatar.public_id;

    if (public_id) {
      const { result } = await cloudinary.uploader.destroy(public_id);

      if (result !== "ok") {
        return res.status(401).json({
          success: false,
          message: "Could not remove image from cloud!",
        });
      }
    }

    await Actor.findByIdAndDelete(actorId);

    return res.status(201).json({
      success: false,
      message: "Record Deleted Successfully",
    });
  } catch (error) {
    console.log("Error remove actor controller");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Actor not deleted",
    });
  }
};

exports.searchActor = async (req, res) => {
  try {
    const { query } = req;
    // query.name;
    const result = await Actor.find({ $text: { $search: `"${query.name}"` } });

    const actors = result.map((actor) => formatActor(actor));

    return res.status(201).json({
      success: true,
      message: "Records Found",
      actors,
    });
  } catch (error) {
    console.log("Error search actor controller");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error in searching actor",
    });
  }
};

// lastest actor controller
exports.getLatestActor = async (req, res) => {
  try {
    const result = await Actor.find().sort({ createdAt: "-1" }).limit(12);

    const actors = result.map((actor) => formatActor(actor));

    return res.status(201).json({
      success: true,
      message: "Records of Latest Actors Found",
      actors,
    });
  } catch (error) {
    console.log("Error latest actor controller");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error in searching latest actor",
    });
  }
};

exports.getSingleActor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(401).json({
        success: false,
        message: "Invalid Request!",
      });
    }

    const actor = await Actor.findById(id);

    if (!actor) {
      return res.status(404).json({
        success: false,
        message: "Invalid request, Actor not found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Record of Actor Found",
      actor: formatActor(actor),
    });
  } catch (error) {
    console.log("Error single actor controller");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error in searching  actor",
    });
  }
};
