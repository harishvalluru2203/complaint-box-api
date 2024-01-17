import * as mongoose from "mongoose";

export const usersSchema = new mongoose.Schema({
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
});

export const User = mongoose.model("Users", usersSchema, "users");
