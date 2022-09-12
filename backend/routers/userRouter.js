import express from "express";
import data from "../data.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";

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

export default userRouter;
