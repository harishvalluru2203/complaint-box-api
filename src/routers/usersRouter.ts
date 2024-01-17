import { Router } from "express";
import { User } from "../models/users.model";

export const usersRouter = Router();

usersRouter.get("/list", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

usersRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const userDetails = await User.findById(userId);
  res.send(userDetails);
});

usersRouter.post("/registration", async (req, res) => {
  const userDetails = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
  });
  const response = await userDetails.save();
  res.json(response);
});

usersRouter.put("/update", async (req, res) => {
  const userToUpdate = req.body._id;
  const userDetails = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
  };
  const response = await User.findOneAndUpdate(
    { _id: userToUpdate },
    { $set: userDetails },
    { new: true }
  );
  res.send(response);
});
