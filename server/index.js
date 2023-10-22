// imports
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// routes
const userRoute = require("./routes/userRoute");
const actorRoute = require("./routes/actorRoute");
const movieRoute = require("./routes/movieRoute");
const reviewRoute = require("./routes/reviewRoute");
const adminRoute = require("./routes/adminRoute");

// functions
const connectDB = require("./config/database");
const { handleNotFound } = require("./utils/helper");
const cloudinaryConnect = require("./config/cloudinary");

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(
  cors({
    limit: "50mb",
    origin: "https://mern-movie-reiew-app-tbfv.vercel.app/",
    credentials: true,
  })
);

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/actor", actorRoute);
app.use("/api/v1/movie", movieRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/app", adminRoute);
app.use("/*", handleNotFound);

// functions
connectDB();
cloudinaryConnect();

app.listen(PORT, () => {
  console.log(`Server is started at ${PORT}`);
});
