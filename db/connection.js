const mongoose = require("mongoose");
require("dotenv").config();


const mongoURI = "mongodb://127.0.0.1:27017/mydatabase";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));