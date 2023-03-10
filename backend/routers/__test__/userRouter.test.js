import app from "../../server";
import supertest from "supertest";
import User from "../../models/userModel";
import data from "../../data";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils";
import { expect, jest } from "@jest/globals";

export const api = supertest(app);

describe("user Route", () => {
  beforeEach(async () => {
    // console.log("Running beforeEach");
    await User.deleteMany({});
  });

  it("should seed the database with data.users", async () => {
    const res = await api.get("/api/users/seed");
    expect(res.status).toEqual(200);
    expect(res.body.createdUser).toHaveLength(data.users.length);
  });

  it("should return the top 3 stock keepers by rating", async () => {
    const users = [
      {
        name: "User1",
        email: "user1@email.com",
        password: "password1",
        isStockKeeper: true,
        stockKeeper: { rating: 5 },
      },
      {
        name: "User2",
        email: "user2@email.com",
        password: "password2",
        isStockKeeper: true,
        stockKeeper: { rating: 4 },
      },
      {
        name: "User3",
        email: "user3@email.com",
        password: "password3",
        isStockKeeper: true,
        stockKeeper: { rating: 3 },
      },
      {
        name: "User4",
        email: "user4@email.com",
        password: "password4",
        isStockKeeper: true,
        stockKeeper: { rating: 2 },
      },
    ];

    await User.insertMany(users);
    const res = await api.get("/api/users/top-stockKeeper");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(3);
    expect(res.body[0].stockKeeper.rating).toEqual(5);
    expect(res.body[1].stockKeeper.rating).toEqual(4);
    expect(res.body[2].stockKeeper.rating).toEqual(3);
  });

  it("should sign in the user with valid credentials", async () => {
    const hashedPassword = bcrypt.hashSync("password", 10);
    const user = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: hashedPassword,
      isSuperAdmin: false,
      isAdmin: false,
      isStockKeeper: false,
    };

    await User.create(user);
    const res = await api
      .post("/api/users/signin")
      .send({ email: "johndoe@example.com", password: "password" });

    expect(res.status).toEqual(200);
    expect(res.body._id).toBeDefined();
    expect(res.body.name).toEqual("John Doe");
    expect(res.body.email).toEqual("johndoe@example.com");
    expect(res.body.isSuperAdmin).toEqual(false);
    expect(res.body.isAdmin).toEqual(false);
    expect(res.body.isStockKeeper).toEqual(false);
    expect(res.body.token).toBeDefined();
  });
  it("should return 401 status and error message for invalid credentials", async () => {
    const hashedPassword = bcrypt.hashSync("password", 10);
    const user = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: hashedPassword,
      isSuperAdmin: false,
      isAdmin: false,
      isStockKeeper: false,
    };

    await User.create(user);
    const res = await api
      .post("/api/users/signin")
      .send({ email: "johndoe@example.com", password: "wrongpassword" });

    expect(res.status).toEqual(401);
    expect(res.body.message).toEqual("Invalid email or password");
  });

  it("should create a new user", async () => {
    let user = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    };

    const res = await api.post("/api/users/register").send(user);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("name", user.name);
    expect(res.body).toHaveProperty("email", user.email);
    expect(res.body).toHaveProperty("isSuperAdmin", false);
    expect(res.body).toHaveProperty("isAdmin", false);
    expect(res.body).toHaveProperty("isStockKeeper", false);
    expect(res.body).toHaveProperty("token");
  });
  it("should return an error if the email already exists", async () => {
    // jest.setTimeout(10000);

    const existingUser = {
      name: "sample",
      email: "sample@example.com",
      password: "password",
    };

    await User.create(existingUser);

    const response = await api
      .post("/api/users/register")
      .send(existingUser)
      .expect(400);

    expect(response.body.message).toBeTruthy();
  });

  it("should return the user data when provided with a valid id", async () => {
    const createdUser = await User.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password",
    });

    const response = await api.get(`/api/users/${createdUser._id}`).expect(200);

    expect(response.body).toHaveProperty("_id", createdUser._id.toString());
    expect(response.body).toHaveProperty("name", "John Doe");
    expect(response.body).toHaveProperty("email", "johndoe@example.com");
  });

  it("should return a 404 error when provided with an invalid id", async () => {
    // jest.setTimeout(10000);
    // jest.useFakeTimers("legacy");
    const userId = "63d9791b1fabea43880b3c30";
    const response = await api.get(`/api/users/${userId}`).expect(404);
    // console.log("res>>>", response);

    expect(response.body).toHaveProperty("message", "user not found");
  });
});

describe("PUT /profile", () => {
  let user;

  beforeEach(async () => {
    user = new User({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
      isStockKeeper: true,
      stockKeeper: {
        name: "John Stock",
        warehouse: "Warehouse 1",
      },
    });
    await user.save();
  });

  it("updates user profile", async () => {
    const response = await api
      .put("/api/users/profile")
      .set("Authorization", `Bearer ${generateToken(user)}`)
      .send({
        name: "Jane Doe",
        email: "janedoe@example.com",
        password: "password456",
        stockKeeperName: "Jane Stock",
        stockKeeperWarehouse: "Warehouse 2",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      _id: expect.any(String),
      name: "Jane Doe",
      email: "janedoe@example.com",
      isStockKeeper: true,
      token: expect.any(String),
    });

    const updatedUser = await User.findById(user._id);
    expect(updatedUser.name).toBe("Jane Doe");
    expect(updatedUser.email).toBe("janedoe@example.com");
    expect(updatedUser.stockKeeper.name).toBe("Jane Stock");
    expect(updatedUser.stockKeeper.warehouse).toBe("Warehouse 2");
    expect(updatedUser.password).not.toBe("password123");
  });
});

describe("first", () => {
  it("returns 401 if not authenticated", async () => {
    const response = await api.put("/api/users/profile");
    // console.log("resp", response);
    expect(response.statusCode).toBe(401);
    expect(response.body).toMatchObject({
      message: "No token",
    });
  });
});

describe("GET /", () => {
  let user1, user2;
  beforeEach(async () => {
    await User.deleteMany({});
    user1 = new User({
      name: "John Doe1",
      email: "johndoe1@example.com",
      password: "password1",
    });
    user2 = new User({
      name: "Jane Doe2",
      email: "janedoe2@example.com",
      password: "password2",
    });
    await user1.save();
    await user2.save();
  });

  it("returns all users", async () => {
    const response = await api.get("/api/users/");

    expect(response.statusCode).toBe(200);
    console.log(response.body);
    expect(response.body).toHaveLength(2);
    // expect(response.body[0]).toContainEqual({
    //   _id: expect.any(String),
    //   name: "John Doe1",
    //   email: "johndoe1@example.com",
    // });
    // expect(response.body[1]).toContainEqual({
    //   _id: expect.any(String),
    //   name: "Jane Doe2",
    //   email: "janedoe2@example.com",
    // });
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          name: "John Doe1",
          email: "johndoe1@example.com",
        }),
        expect.objectContaining({
          _id: expect.any(String),
          name: "Jane Doe2",
          email: "janedoe2@example.com",
        }),
      ])
    );
  });
});

describe("DELETE /user/:id", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should delete a user and return a message", async () => {
    const user = new User({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
    });
    await user.save();

    const Admin = new User({
      name: "Admin",
      email: "Admin@example.com",
      password: "1234",
      isAdmin: true,
    });
    await Admin.save();

    console.log("tokenise>>>", generateToken(Admin));
    console.log("userid>>>", user._id);

    const response = await api
      .delete(`/api/users/${user._id}`)
      .set("Authorization", `Bearer ${generateToken(Admin)}`)
      .send();
    console.log("response status", response.statusCode);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("user deleted");
    expect(response.body.user._id).toEqual(user._id.toString());
  });

  it("should return a status code 401 and a message if trying to delete super admin", async () => {
    const superAdmin = new User({
      name: "Super Admin",
      email: "SuperAdmin@example.com",
      password: "12345678",
      isSuperAdmin: true,
    });
    await superAdmin.save();

    const response = await api
      .delete(`/api/users/${superAdmin._id}`)
      .set("Authorization", `Bearer ${generateToken(superAdmin)}`)
      .send();

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid admin token");
  });

  it("should return a status code 400 and a message if trying to delete admin", async () => {
    const admin = new User({
      name: "Admin",
      email: "Admin@example.com",
      password: "12345678",
      isAdmin: true,
    });
    await admin.save();

    const response = await api
      .delete(`/api/users/${admin._id}`)
      .set("Authorization", `Bearer ${generateToken(admin)}`)
      .send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("cannot delete admin");
  });

  it("should return a status code 404 and a message if the user is not found", async () => {
    const response = await api.delete(`/user/5f3c3e3a3a3a3a3a3a3a3a3a`).send();

    expect(response.status).toBe(404);
    // expect(response.body.message).toBe("undefined");
  });
});

describe("PUT /:id", () => {
  beforeEach(async () => {
    let user = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    };

    const res = await api.post("/api/users/register").send(user);
  });
  it("updates a user and returns updated user", async () => {
    const user = new User({
      name: "dele",
      email: "dele@example.com",
      password: "12345678",
      isAdmin: false,
    });
    await user.save();

    const admin = new User({
      name: "Admin",
      email: "Admin@example.com",
      password: "12345678",
      isAdmin: true,
    });
    await admin.save();

    const res = await api
      .put(`/api/users/${user._id}`)
      .send({
        name: "updated name",
        email: "updated@example.com",
        isSuperAdmin: true,
        isAdmin: false,
        isStockKeeper: false,
      })
      .set("Authorization", `Bearer ${generateToken(admin)}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("user updated");
    expect(res.body.user.name).toEqual("updated name");
    expect(res.body.user.email).toEqual("updated@example.com");
    expect(res.body.user.isSuperAdmin).toEqual(true);
    expect(res.body.user.isAdmin).toEqual(false);
    expect(res.body.user.isStockKeeper).toEqual(false);
  });

  it("returns 404 for non-existing user", async () => {
    const res = await api.put("/users/non-existing-id");
    expect(res.statusCode).toEqual(404);
    // expect(res.body.message).toEqual("user not found");
  });
});
