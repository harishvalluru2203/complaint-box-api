import { User } from "../models/user.model";
import { Admin } from "../models/admin.model";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const login = async (userName, password, loginType, res) => {
  const model: any = loginType === "admin" ? Admin : User;
  const loggedInAs = await model.findOne({ userName });
  if (!loggedInAs) {
    res.status(401).json({ error: "Authentication Failed" });
  }
  const isValidPassword = await bcrypt.compare(password, loggedInAs.password);
  if (!isValidPassword) {
    res.status(401).json({ error: "Authentication Failed" });
  }
  const token = jwt.sign({ user: loggedInAs._id }, "mySecretKey", {
    expiresIn: "1h",
  });
  res.status(200).json({ token: token });
};
