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

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "invalid token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No token" });
  }
};
