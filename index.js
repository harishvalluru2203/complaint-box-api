const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
import { masterRouter } from "./src/routers/masterRouter";
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

app.use(express.json());

// This will convert request object to json format (req.body to json)
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

mongoose.connect(process.env.MONGODB_CLOUD_URI);

const mongooseConnection = mongoose.connection;

masterRouter(app);

mongooseConnection.on("open", () => {
  console.log("MONGOOSE CONNECTION ESTABLISHED");
});

app.listen("4000", () => {
  console.log("App running on port 4000");
});
