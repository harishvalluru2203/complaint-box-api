import { Router } from "express";
import { Complaint } from "../models/complaint";

export const complaintRouter = Router();

complaintRouter.get("/", async (req, res) => {
  const complaints = await Complaint.find();
  res.send(complaints);
});
