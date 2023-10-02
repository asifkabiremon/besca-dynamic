const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  await mongoose
    .connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log("MongoDB connection error: ", err);
    });
};

module.exports = { connectDB };
