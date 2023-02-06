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

describe("GET /orders/:id", () => {
  //   const del = new User({
  //     name: "del",
  //     email: "del@email.com",
  //     password: "password",
  //     isAdmin: true,
  //   });
  //   await del.save();

  //   const order = new Order({
  //     user: del._id,
  //     orderItems: [
  //       {
  //         product: new mongoose.Types.ObjectId(),
  //         qty: 2,
  //         year: 2022,
  //         make: "Toyota",
  //         model: "Camry",
  //         type: "Sedan",
  //         image: "image1.jpg",
  //         price: 100,
  //       },
  //       {
  //         product: new mongoose.Types.ObjectId(),
  //         qty: 1,
  //         year: 2020,
  //         make: "Honda",
  //         model: "Civic",
  //         type: "Sedan",
  //         image: "image2.jpg",
  //         price: 50,
  //       },
  //     ],
  //     shippingAddress: {
  //       name: "Jane Doe",
  //       address: "123 Main St",
  //       city: "San Francisco",
  //       postalCode: "94109",
  //       country: "USA",
  //     },
  //     paymentMethod: "Credit Card",
  //     itemsPrice: 200,
  //     totalPrice: 210,
  //   });

  //   await order.save();

  //   console.log("order >>", order._id);
  //   console.log("token1>>", token);

  //   token = generateToken(del);

  it("should return 401 if client is not logged in", async () => {
    const messi = new User({
      name: "messi",
      email: "messi@email.com",
      password: "password",
      isAdmin: true,
    });
    await messi.save();

    const order = new Order({
      user: messi._id,
      orderItems: [
        {
          product: new mongoose.Types.ObjectId(),
          qty: 4,
          year: 2022,
          make: "Toyota",
          model: "Rx330",
          type: "SUV",
          image: "image1.jpg",
          price: 1000,
        },
        {
          product: new mongoose.Types.ObjectId(),
          qty: 1,
          year: 2022,
          make: "Honda",
          model: "Civic",
          type: "Sedan",
          image: "image2.jpg",
          price: 500,
        },
      ],
      shippingAddress: {
        name: "Doe",
        address: "123 Main St",
        city: "San Francisco",
        postalCode: "94109",
        country: "USA",
      },
      paymentMethod: "Credit Card",
      itemsPrice: 200,
      totalPrice: 210,
    });

    await order.save();

    const token = generateToken(messi);

    console.log("order 2 >>", order._id);
    console.log("token 2>>", token);

    const res = await api.get(`/api/orders/${order.id}`);

    // console.log("id1>>", order._id);
    console.log("token1>>", token);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("No token");
  });

  it("should return 404 if order with the given id is not found", async () => {
    const lexy = new User({
      name: "lexy",
      email: "lexy@email.com",
      password: "password",
      isAdmin: true,
    });
    await lexy.save();

    const order = new Order({
      user: lexy._id,
      orderItems: [
        {
          product: new mongoose.Types.ObjectId(),
          qty: 4,
          year: 2022,
          make: "Toyota",
          model: "Rx330",
          type: "SUV",
          image: "image1.jpg",
          price: 1000,
        },
        {
          product: new mongoose.Types.ObjectId(),
          qty: 1,
          year: 2022,
          make: "Honda",
          model: "Civic",
          type: "Sedan",
          image: "image2.jpg",
          price: 500,
        },
      ],
      shippingAddress: {
        name: "Doe",
        address: "123 Main St",
        city: "San Francisco",
        postalCode: "94109",
        country: "USA",
      },
      paymentMethod: "Credit Card",
      itemsPrice: 200,
      totalPrice: 210,
    });

    await order.save();

    const token = generateToken(lexy);
    const invalidId = "1".repeat(24);

    const res = await api
      .get(`/api/orders/${invalidId}`)
      .set("Authorization", ` Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("order not found");
  });

  it("should return the order if it is found", async () => {
    const oneal = new User({
      name: "oneal",
      email: "oneal@email.com",
      password: "password",
      isAdmin: true,
    });
    await oneal.save();

    const order = new Order({
      user: oneal._id,
      orderItems: [
        {
          product: new mongoose.Types.ObjectId(),
          qty: 4,
          year: 2022,
          make: "Toyota",
          model: "Rx330",
          type: "SUV",
          image: "image1.jpg",
          price: 1000,
        },
        {
          product: new mongoose.Types.ObjectId(),
          qty: 1,
          year: 2022,
          make: "Honda",
          model: "Civic",
          type: "Sedan",
          image: "image2.jpg",
          price: 500,
        },
      ],
      shippingAddress: {
        name: "Doe",
        address: "123 Main St",
        city: "San Francisco",
        postalCode: "94109",
        country: "USA",
      },
      paymentMethod: "Credit Card",
      itemsPrice: 200,
      totalPrice: 210,
    });

    await order.save();

    const token = generateToken(oneal);

    const res = await api
      .get(`/api/orders/${order._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("orderItems");
    expect(res.body).toHaveProperty("shippingAddress");
    expect(res.body).toHaveProperty("paymentMethod");
    expect(res.body).toHaveProperty("itemsPrice");
    expect(res.body).toHaveProperty("totalPrice");
    expect(res.body).toHaveProperty("user");
  });
});

describe("POST /orders/:id/pay", () => {
  it("should update an order as paid", async () => {
    const retro = new User({
      name: "retro",
      email: "retro@email.com",
      password: "password",
      isAdmin: true,
    });
    await retro.save();

    const order = await Order.create(
      {
        user: retro._id,
        orderItems: [
          {
            product: new mongoose.Types.ObjectId(),
            qty: 4,
            year: 2022,
            make: "Toyota",
            model: "Rx330",
            type: "SUV",
            image: "image1.jpg",
            price: 1000,
          },
          {
            product: new mongoose.Types.ObjectId(),
            qty: 1,
            year: 2022,
            make: "Honda",
            model: "Civic",
            type: "Sedan",
            image: "image2.jpg",
            price: 500,
          },
        ],
        shippingAddress: {
          name: "Doe",
          address: "123 Main St",
          city: "San Francisco",
          postalCode: "94109",
          country: "USA",
        },
        paymentMethod: "Credit Card",
        itemsPrice: 200,
        totalPrice: 210,
      }
      // order data here
    );
    const res = await api.post(`/api/orders/${order._id}/pay`).send({
      id: "123456",
      status: "success",
      update_time: "2023-01-30T10:00:00Z",
      email_address: "example@email.com",
    });

    // console.log("Ress>>", res);

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("message", "Order Updated");
    expect(res.body.order).toHaveProperty("isPaid", true);
    expect(res.body.order).toHaveProperty("paidAt");
    expect(res.body.order).toHaveProperty("paymentResult");
    expect(res.body.order.paymentResult).toHaveProperty("id", "123456");
    expect(res.body.order.paymentResult).toHaveProperty("status", "success");
    expect(res.body.order.paymentResult).toHaveProperty(
      "update_time",
      "2023-01-30T10:00:00Z"
    );
    expect(res.body.order.paymentResult).toHaveProperty(
      "email_address",
      "example@email.com"
    );
  });

  it("should return 404 if order is not found", async () => {
    const res = await api
      .post("/api/orders/5f47b60027aa3c0698ce77ab/pay")
      .send({
        id: "123456",
        status: "success",
        update_time: "2023-01-30T10:00:00Z",
        email_address: "example@email.com",
      });
    // console.log("Ress2>>", res);
    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty("message", "Order not found");
  });
});

describe("DELETE /orders/:id", () => {
  it("should delete an order if the order exists and the user has admin privileges", async () => {
    const Admin = new User({
      name: "Miami",
      email: "Miami@example.com",
      password: "1234",
      isAdmin: true,
    });
    await Admin.save();

    const order = new Order({
      user: new mongoose.Types.ObjectId(),
      orderItems: [
        {
          product: new mongoose.Types.ObjectId(),
          qty: 4,
          year: 2022,
          make: "Toyota",
          model: "Rx330",
          type: "SUV",
          image: "image1.jpg",
          price: 1000,
        },
        {
          product: new mongoose.Types.ObjectId(),
          qty: 1,
          year: 2022,
          make: "Honda",
          model: "Civic",
          type: "Sedan",
          image: "image2.jpg",
          price: 500,
        },
      ],
      shippingAddress: {
        name: "Doe",
        address: "123 Main St",
        city: "San Francisco",
        postalCode: "94109",
        country: "USA",
      },
      paymentMethod: "Credit Card",
      itemsPrice: 200,
      totalPrice: 210,
    });

    await order.save();

    const res = await api
      .delete(`/api/orders/${order._id}`)
      .set("Authorization", `Bearer ${generateToken(Admin)}`);
    // console.log("ress.body>>>", res.body);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("order deleted");
    expect(res.body.order).toBeInstanceOf(Object);
  });

  it("should return an error if the order does not exist", async () => {
    // const invalidId = "1".repeat(24);
    const Admin = new User({
      name: "florida",
      email: "florida@example.com",
      password: "1234",
      isAdmin: true,
    });
    await Admin.save();

    const res = await api
      .delete(`/api/orders/${new mongoose.Types.ObjectId()}`)
      .set("Authorization", `Bearer ${generateToken(Admin)}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("order not found");
  });

  it("should return an unauthorized error if the user is not authenticated", async () => {
    const Admin = new User({
      name: "king",
      email: "king@example.com",
      password: "1234",
      isAdmin: true,
    });
    await Admin.save();

    const order = new Order({
      user: new mongoose.Types.ObjectId(),
      orderItems: [
        {
          product: new mongoose.Types.ObjectId(),
          qty: 4,
          year: 2022,
          make: "Toyota",
          model: "Rx330",
          type: "SUV",
          image: "image1.jpg",
          price: 1000,
        },
        {
          product: new mongoose.Types.ObjectId(),
          qty: 1,
          year: 2022,
          make: "Honda",
          model: "Civic",
          type: "Sedan",
          image: "image2.jpg",
          price: 500,
        },
      ],
      shippingAddress: {
        name: "Doe",
        address: "123 Main St",
        city: "San Francisco",
        postalCode: "94109",
        country: "USA",
      },
      paymentMethod: "Credit Card",
      itemsPrice: 200,
      totalPrice: 210,
    });

    await order.save();
    const res = await api.delete(`/api/orders/${order._id}`);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("No token");
  });
});
