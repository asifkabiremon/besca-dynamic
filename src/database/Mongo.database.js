const mongoose = require("mongoose");

const connectDB = async () => {
  const connectionString = process.env.MONGODB_URI;

  await mongoose
    .connect(connectionString)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log("MongoDB connection error: ", err);
    });
};

module.exports = { connectDB };
