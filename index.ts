const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
import { masterRouter } from "./src/routers/masterRouter";
import { initializeMongoose } from "./mongoose";
import { appUseUtils } from "./appUseUtils";

const app = express();

appUseUtils(app);

initializeMongoose(process.env.MONGODB_URI);

masterRouter(app);

app.listen("4000", () => {
  console.log("App running on port 4000");
});
