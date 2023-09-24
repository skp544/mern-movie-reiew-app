// imports
const express = require("express");
const userRoute = require("./routes/userRoute");
const connectDB = require("./config/database");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());

// routes
app.use("/api/v1/user", userRoute);

// functions
connectDB();

app.listen(PORT, () => {
  console.log(`Server is started at ${PORT}`);
});
