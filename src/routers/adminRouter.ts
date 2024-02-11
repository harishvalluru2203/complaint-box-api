import { Router } from "express";
import { login } from "../utils/authUtil";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const adminRouter = Router();

adminRouter.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    login(userName, password, "admin", res);
  } catch (error) {
    res.status(500).json({ error: "Login Failed" });
  }
});
