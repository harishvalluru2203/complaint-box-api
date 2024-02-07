import mongoose from "mongoose";

export const initializeMongoose = (MONGODB_URI) => {
  mongoose.connect(MONGODB_URI);
  const mongooseConnection = mongoose.connection;

  mongooseConnection.on("open", () => {
    console.log("MONGOOSE CONNECTION ESTABLISHED");
  });
};
