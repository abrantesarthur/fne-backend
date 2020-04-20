const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// load .env variables into process.env
require("dotenv").config();

// connect to the database
const uri = process.env.ATLAS_URI; // endpoint
console.log("uri: " + uri);
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("Connected successfully to the database..");

  const courseRouter = require("./routes/course.route");

  //middlewares
  app.use(cors());
  app.use(express.json());
  app.use("/course", courseRouter);

  const port = process.env.PORT | 5000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
});
