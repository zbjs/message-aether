const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongoURI = process.env.MONGO_URI;

exports.connect = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected Successfully: \n" + mongoURI);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

exports.disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB Disconnected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
