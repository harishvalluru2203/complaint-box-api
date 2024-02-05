const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
import { masterRouter } from "./src/routers/masterRouter";
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://harishvalluru22:Samvi@complaintboxcluster.wpzuvye.mongodb.net/?retryWrites=true&w=majority";

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

mongoose.connect(uri);

const mongooseConnection = mongoose.connection;

masterRouter(app);

mongooseConnection.on("open", () => {
  console.log("MONGOOSE CONNECTION ESTABLISHED");
});

app.listen("4000", () => {
  console.log("App running on port 4000");
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("complaintBoxDB").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
