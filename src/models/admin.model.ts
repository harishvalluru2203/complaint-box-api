import * as mongoose from "mongoose";

export const adminSchema = new mongoose.Schema({
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

export const Admin = mongoose.model("Admin", adminSchema, "admins");
