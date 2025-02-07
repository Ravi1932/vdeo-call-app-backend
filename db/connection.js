const mongoose = require("mongoose");
require("dotenv").config();


const mongoURI = "mongodb+srv://akshaylahagora:qy7JiJdPSWX86oKN@escreenapp.3euby.mongodb.net/escreen";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));