import { Router } from "express";
import { SuperAdmin } from "../models/superAdmin";

const superAdminRouter = Router();

superAdminRouter.get("/", async (req, res) => {
  const superAdmins = await SuperAdmin.find();
  res.send(superAdmins);
});

superAdminRouter.post("/", async (req, res) => {
  const superAdmin = new SuperAdmin({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
  });
  const response = await superAdmin.save();
  res.json(response);
});

export { superAdminRouter };
