import { Router } from "express";
import { User } from "../models/users.model";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const authRouter = Router();

// diff bwn 401,500

authRouter.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (!user) {
      res.status(401).json({ error: "Authentication Failed" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ error: "Authentication Failed" });
    }
    const token = jwt.sign({ user: user._id }, "mySecretKey", {
      expiresIn: "1h",
    });
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ error: "Login Failed" });
  }
});
