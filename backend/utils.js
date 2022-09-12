import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isSuperAdmin: user.isSuperAdmin,
      isAdmin: user.isAdmin,
      isStockKeeper: user.isStockKeeper,
    },
    process.env.JWT_SECRET || "somethingsecret",
    { expiresIn: "30d" }
  );
};
