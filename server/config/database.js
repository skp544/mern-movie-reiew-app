const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  mongoose
    .connect(process.env.MOGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database is connected");
    })
    .catch((err) => {
      console.log("Error in connecting Database");
      console.log(err);
    });
};

module.exports = connectDB;

// bCQ6FRZ6kOu6BuqJ

// mongodb+srv://iamskp2001:bCQ6FRZ6kOu6BuqJ@cluster0.lujlhpe.mongodb.net/movie-review-app?retryWrites=true&w=majority
