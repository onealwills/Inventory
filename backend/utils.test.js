import jwt from "jsonwebtoken";
import {
  generateToken,
  isAdmin,
  isAuth,
  isStockKeeper,
  isStockKeeperOrAdmin,
  isSuperAdmin,
} from "../backend/utils";

describe("generateToken", () => {
  it("should generate a token from a user object", () => {
    const user = {
      _id: "123",
      name: "John Doe",
      email: "johndoe@example.com",
      isSuperAdmin: true,
      isAdmin: false,
      isStockKeeper: true,
    };

    const token = generateToken(user);

    expect(token).toBeTruthy();
    expect(typeof token).toBe("string");

    const decoded = jwt.decode(token);
    console.log("decoded>>>", decoded);

    expect(decoded).toMatchObject({
      _id: user._id,
      name: user.name,
      email: user.email,
      isSuperAdmin: user.isSuperAdmin,
      isAdmin: user.isAdmin,
      isStockKeeper: user.isStockKeeper,
    });
  });

  it("should throw an error when no user object is provided", () => {
    expect(() => {
      generateToken();
    }).toThrowError("Cannot read property '_id' of undefined");
  });
});

describe("isAuth", () => {
  it("should return 401 status if no token is provided", () => {
    const req = { headers: {} };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    };
    const next = jest.fn();
    isAuth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.status().send).toHaveBeenCalledWith({ message: "No token" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 status if token is invalid", () => {
    const req = { headers: { authorization: "Bearer invalidtoken" } };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    };
    const next = jest.fn();
    // jwt.verify = jest.fn(() => {
    //   throw new Error("invalid token");
    // });
    jwt.verify = jest.fn((token, secret, cb) => {
      cb(new Error("invalid token"));
    });
    isAuth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.status().send).toHaveBeenCalledWith({
      message: "invalid token",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next and set req.user if token is valid", () => {
    const req = { headers: { authorization: "Bearer validtoken" } };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    };
    const next = jest.fn();
    const decode = { _id: "123", name: "John Doe" };
    jwt.verify = jest.fn((token, secret, cb) => {
      cb(null, decode);
    });
    isAuth(req, res, next);
    expect(req.user).toEqual(decode);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.status().send).not.toHaveBeenCalled();
  });
});

describe("isAdmin", () => {
  it("should return 401 status if user is not an admin", () => {
    const req = { user: { isAdmin: false } };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    };
    const next = jest.fn();
    isAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.status().send).toHaveBeenCalledWith({
      message: "Invalid admin token",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if user is an admin", () => {
    const req = { user: { isAdmin: true } };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    };
    const next = jest.fn();
    isAdmin(req, res, next);
    expect(req.user.isAdmin).toBe(true);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.status().send).not.toHaveBeenCalled();
  });
});

describe("isStockKeeper", () => {
  //   it("should return 401 status if user is not a stock keeper", () => {
  //     const req = { user: { isStockKeeper: false } };
  //     const res = {
  //       status: jest.fn().mockReturnValue({ send: jest.fn() }),
  //     };

  //     const next = jest.fn();
  //     isStockKeeper(req, res, next);
  //     expect(res.status).toHaveBeenCalledWith(401);
  //     res.status(401).send({ message: "Invalid Stock keeper token" });
  //     expect(next).not.toHaveBeenCalled();
  //   });

  it("should call next if user is a stock keeper", () => {
    const req = { user: { isStockKeeper: true } };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    };
    const next = jest.fn();
    isStockKeeper(req, res, next);
    expect(req.user.isStockKeeper).toBe(true);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.status().send).not.toHaveBeenCalled();
  });
});

describe("isStockKeeperOrAdmin", () => {
  it("should return 401 status if user is not a stock keeper or admin", () => {
    const req = { user: { isStockKeeper: false, isAdmin: false } };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    };
    const next = jest.fn();
    isStockKeeperOrAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.status().send).toHaveBeenCalledWith({
      message: "Invalid Admin/Stock Keeper Token",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if user is a stock keeper", () => {
    const req = { user: { isStockKeeper: true, isAdmin: false } };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    };
    const next = jest.fn();
    isStockKeeperOrAdmin(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.status().send).not.toHaveBeenCalled();
  });

  it("should call next if user is an admin", () => {
    const req = { user: { isStockKeeper: false, isAdmin: true } };
    const res = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    };
    const next = jest.fn();
    isStockKeeperOrAdmin(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.status().send).not.toHaveBeenCalled();
  });
});

describe("isSuperAdmin", () => {
  it("should return 401 status if user is not a super admin", () => {
    const req = {
      user: {
        isAdmin: true,
        isStockKeeper: true,
        isSuperAdmin: false,
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn(),
      }),
    };
    const next = jest.fn();
    isSuperAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.status().send).toHaveBeenCalledWith({
      message: "invalid SuperAdmin token",
    });
  });

  it("should call next() if user is a super admin", () => {
    const req = {
      user: {
        isAdmin: true,
        isStockKeeper: true,
        isSuperAdmin: true,
      },
    };
    const res = {};
    const next = jest.fn();
    isSuperAdmin(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

describe("isStockKeeper", () => {
  it("should return 401 status if user is not a stock keeper", () => {
    const req = {
      user: {
        isStockKeeper: false,
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({
        send: jest.fn(),
      }),
    };
    const next = jest.fn();

    isStockKeeper(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.status().send).toHaveBeenCalledWith({
      message: "Invalid Stock keeper token",
    });
  });

  it("should call next function if user is a stock keeper", () => {
    const req = {
      user: {
        isStockKeeper: true,
      },
    };
    const res = {};
    const next = jest.fn();

    isStockKeeper(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
