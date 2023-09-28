// imports
const express = require("express");
const userRoute = require("./routes/userRoute");
const connectDB = require("./config/database");
require("dotenv").config();
const cors = require("cors");
const { handleNotFound } = require("./utils/helper");

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/user", userRoute);
app.use("/*", handleNotFound);

// functions
connectDB();

app.listen(PORT, () => {
  console.log(`Server is started at ${PORT}`);
});
