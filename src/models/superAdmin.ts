const mongoose = require("mongoose");

const superAdminSchema = new mongoose.Schema({
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

export const SuperAdmin = mongoose.model(
  "SuperAdmin",
  superAdminSchema,
  "superAdmins"
);
