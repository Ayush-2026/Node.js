const mongoose = require("mongoose");
require('dotenv').config();

const mongo_URL = process.env.DB_URL_LOCAL;
//const mongo_URL =
  process.env.DB_URL;

mongoose.connect(mongo_URL);

const db2 = mongoose.connection;

db2.on("connected", () => {
  console.log("Connected to MongoDB Server");
});

db2.on("error", () => {
  console.log("MongoDB connection error:");
});

db2.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = db2;
