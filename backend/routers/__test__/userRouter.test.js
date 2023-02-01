import app from "../../server";
import supertest from "supertest";
import User from "../../models/userModel";
import data from "../../data";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils";
import { expect, jest } from "@jest/globals";

export const api = supertest(app);

// console.log(api);

describe("user Route", () => {
  beforeEach(async () => {
    // console.log("Running beforeEach");
    await User.deleteMany({});
  });
  // afterEach(() => {
  //   jest.useRealTimers();
  // });
  //   afterAll(() => jest.setTimeout(5 * 1000));
  // afterAll(() => jest.clearAllTimers());

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

  it("should seed the database with data.users", async () => {
    const res = await api.get("/api/users/seed");
    expect(res.status).toEqual(200);
    expect(res.body.createdUser).toHaveLength(data.users.length);
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
