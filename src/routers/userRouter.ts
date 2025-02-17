import { Router } from "express";
import { User } from "../models/user.model";
import { verifyToken } from "../middleware/authMiddleware";
import { login } from "../utils/authUtil";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const userRouter = Router();

userRouter.get("/test-list", async (req, res) => {
  res.status(200).json([
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      address: {
        street: "Victor Plains",
        suite: "Suite 879",
        city: "Wisokyburgh",
        zipcode: "90566-7771",
        geo: {
          lat: "-43.9509",
          lng: "-34.4618",
        },
      },
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
        bs: "synergize scalable supply-chains",
      },
    },
  ]);
});

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
