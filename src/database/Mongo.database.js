const mongoose = require("mongoose");

const connectDB = async () => {
  const connectionString = "mongodb+srv://emon:5rhbxv5wT0FBpTPc@cluster0.3m76gt7.mongodb.net/BES3D?retryWrites=true&w=majority";

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
