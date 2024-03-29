import * as mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
});

export const User = mongoose.model("Users", userSchema, "users");
