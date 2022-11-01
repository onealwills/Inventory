import express from "express";
import data from "../data.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import {
  generateToken,
  isAdmin,
  isAuth,
  isStockKeeperOrAdmin,
} from "../utils.js";

const userRouter = express.Router();

userRouter.get("/seed", async (req, res) => {
  await User.deleteMany({});
  const createdUser = await User.insertMany(data.users);
  res.send({ createdUser });
});

userRouter.post("/signin", async (req, res) => {
  // console.log("req body>>>", req.body);
  const user = await User.findOne({ email: req.body.email });
  // console.log("user>>>", user.password);
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isSuperAdmin: user.isSuperAdmin,
        isAdmin: user.isAdmin,
        isStockKeeper: user.isStockKeeper,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid email or password" });
});

userRouter.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  const createdUser = await user.save();
  res.send({
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    isSuperAdmin: createdUser.isSuperAdmin,
    isAdmin: createdUser.isAdmin,
    isStockKeeper: createdUser.isStockKeeper,
    token: generateToken(createdUser),
  });
});

userRouter.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "user not found" });
  }
});

userRouter.put("/profile", isAuth, async (req, res) => {
  // console.log("req authorization>>>", req.headers.authorization);
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8);
    }
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isSuperAdmin: updatedUser.isSuperAdmin,
      isAdmin: updatedUser.isAdmin,
      isStockKeeper: updatedUser.isStockKeeper,
      token: generateToken(updatedUser),
    });
  }
});

userRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

userRouter.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.email === "SuperAdmin@example.com") {
      res.status(400).send({ message: "cannot delete super admin" });
      return;
    }
    if (user.email === "Admin@example.com") {
      res.status(400).send({ message: "cannot delete admin" });
      return;
    }
    const deleteUser = await user.remove();
    res.send({ message: "user deleted", user: deleteUser });
  } else {
    res.status(404).send({ message: "user not found" });
  }
});
export default userRouter;
