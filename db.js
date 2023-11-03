const Mongoose = require("mongoose");
require("dotenv").config();

Mongoose.set('strictQuery', false);

const connectDB = async () => {
  await Mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("Connection SuccessFul !!!");
}
module.exports = connectDB