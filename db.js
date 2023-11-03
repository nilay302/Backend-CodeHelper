const mongoose = require("mongoose"); // Change "Mongoose" to "mongoose" (lowercase)
require("dotenv").config();

// mongoose.set('strictQuery', false); // Correct method is mongoose.set, not Mongoose.set

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection Successful !!!");
  } catch (error) {
    console.error("Connection failed:", error);
  }
};

module.exports = connectDB;