import { api } from "./userRouter.test";
// import Product from "../../models/productModel";
import User from "../../models/userModel";
import Order from "../../models/orderModel";
import { generateToken } from "../../utils";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

describe("GET /orders", () => {
  it("should return all orders filtered by stockKeeper if provided", async () => {
    const Admin = new User({
      name: "Dele",
      email: "Dele@example.com",
      password: "12345678",
      isAdmin: true,
      isStockKeeper: true,
    });
    await Admin.save();

    const stockKeeper = new User({
      name: "Ali",
      email: "Ali@example.com",
      password: "12345678",
      isAdmin: true,
      isStockKeeper: true,
    });
    await stockKeeper.save();

    // const stockKeeper = "John Doe";

    const token = generateToken(Admin);
    console.log("token for stockkeeper>>", token);
    const res = await api
      .get(`/api/orders?stockKeeper=${stockKeeper._id}`)
      .set("Authorization", `Bearer ${token}`)
      //   .query({ stockKeeper: "John Doe" })
      .expect(200);

    expect(res.body).toBeInstanceOf(Array);
  });

  it("should return all orders if no stockKeeper filter is provided", async () => {
    const Admin = new User({
      name: "nigga",
      email: "nigga@example.com",
      password: "12345678",
      isAdmin: true,
    });
    await Admin.save();

    const token = generateToken(Admin);

    const res = await api
      .get("/api/orders")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    // expect(res.body).toHaveLength(5);
  });

  it("should return 401 if the user is not authenticated", async () => {
    const res = await api.get("/api/orders");

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("No token");
  });

  it("should return 403 if the user is not an admin", async () => {
    const user = { name: "Jane Doe", isAdmin: false };
    const token = generateToken(user);

    const res = await api
      .get("/api/orders")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid admin token");
  });
});

describe("GET /api/orders/summary", () => {
  it("should return the summary of orders, users, daily orders, and product types", async () => {
    const Admin = new User({
      name: "tell",
      email: "tell@example.com",
      password: "12345678",
      isAdmin: true,
    });
    await Admin.save();

    const token = generateToken(Admin);

    const res = await api
      .get("/api/orders/summary")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("users");
    expect(res.body).toHaveProperty("orders");
    expect(res.body).toHaveProperty("dailyOrders");
    expect(res.body).toHaveProperty("productTypes");
  });
});

test("Should get all orders for authenticated user", async () => {
  const user = new User({
    name: "jah",
    email: "jah@example.com",
    password: "12345678",
    isAdmin: false,
  });

  await user.save();

  const token = generateToken(user);
  const response = await api
    .get("/api/orders/mine")
    .set("Authorization", `Bearer ${token}`)
    .send()
    .expect(200);

  expect(response.body.length).toBe(0);
});

test("Should return 401 if user is not authenticated", async () => {
  await api.get("/api/orders/mine").send().expect(401);
});

describe("Post an Order", () => {
  it("Should create an order", async () => {
    const hashedPassword = bcrypt.hashSync("password", 10);
    const user = {
      name: "John",
      email: "john@example.com",
      password: hashedPassword,
      isSuperAdmin: false,
      isAdmin: false,
      isStockKeeper: false,
    };

    await User.create(user);

    const authResponse = await api.post("/api/users/signin").send({
      email: "john@example.com",
      password: "password",
    });
    // console.log("john auth res>>", authResponse);

    const orderItems = [
      {
        product: mongoose.Types.ObjectId(),
        quantity: 2,
        stockKeeper: mongoose.Types.ObjectId(),
        make: "Toyota",
        model: "Camry",
        year: 2020,
        type: "Sedan",
        image: "image.jpg",
        price: 5,
        qty: 2,
      },
      {
        product: mongoose.Types.ObjectId(),
        quantity: 3,
        stockKeeper: mongoose.Types.ObjectId(),
        make: "Honda",
        model: "Civic",
        year: 2021,
        type: "Sedan",
        image: "image.jpg",
        price: 5,
        qty: 3,
      },
    ];
    const shippingAddress = {
      name: "Address 1",
      address: "Address 1",
      city: "City 1",
      postalCode: "123456",
      country: "Country 1",
    };
    const paymentMethod = "Visa";
    const itemsPrice = 10;
    const totalPrice = 20;

    const res = await api
      .post("/api/orders")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        totalPrice,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "order created");
    expect(res.body.order).toHaveProperty("orderItems");
    expect(res.body.order).toHaveProperty("shippingAddress", shippingAddress);
    expect(res.body.order).toHaveProperty("paymentMethod", paymentMethod);
    expect(res.body.order).toHaveProperty("itemsPrice", itemsPrice);
    expect(res.body.order).toHaveProperty("totalPrice", totalPrice);
    expect(res.body.order).toHaveProperty("user");
  });

  it("Should return an error if cart is empty", async () => {
    const hashedPassword = bcrypt.hashSync("password", 10);
    const user = {
      name: "felix",
      email: "felix@example.com",
      password: hashedPassword,
      isSuperAdmin: false,
      isAdmin: false,
      isStockKeeper: false,
    };

    await User.create(user);

    const authResponse = await api.post("/api/users/signin").send({
      email: "felix@example.com",
      password: "password",
    });

    const res = await api
      .post("/api/orders")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send({
        orderItems: [],
        shippingAddress: "",
        paymentMethod: "",
        itemsPrice: 0,
        totalPrice: 0,
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "cart empty");
  });
});
