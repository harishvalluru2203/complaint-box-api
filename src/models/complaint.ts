import * as mongoose from "mongoose";

export const complaintSchema = new mongoose.Schema({
  complaint: {
    type: String,
  },
  description: {
    type: String,
  },
});

export const Complaint = mongoose.model(
  "Complaint",
  complaintSchema,
  "complaints"
);
