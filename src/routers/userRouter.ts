import { Router } from "express";
import { User } from "../models/user.model";
import { verifyToken } from "../middleware/authMiddleware";
import { login } from "../utils/authUtil";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const userRouter = Router();

userRouter.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    login(userName, password, "user", res);
  } catch (error) {
    res.status(500).json({ error: "Login Failed" });
  }
});

userRouter.get("/list", verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

userRouter.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: await bcrypt.hash(req.body.password, 10),
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

userRouter.put("/update", async (req, res) => {
  try {
    const userToUpdate = req.body._id;
    const user = await User.findByIdAndUpdate(userToUpdate, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
