import * as express from "express";
import { masterRouter } from "./routers/masterRouter";
const mongoose = require("mongoose");

const app = express();

const url = "mongodb://localhost:27017/complaintBoxDB";
mongoose.connect(url, {
  useNewUrlParser: true,
});
const mongooseConnection = mongoose.connection;

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

// This will convert request object to json format(req.body to json)
app.use(
  express.urlencoded({
    extended: true,
  })
);

masterRouter(app);

mongooseConnection.on("open", () =>
  console.log("MONGOOSE CONNECTION STARTED......!")
);

app.listen(2020, () => console.log("SERVER STARTED........!"));
