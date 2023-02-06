import { api } from "./userRouter.test";
// import Product from "../../models/productModel";
import User from "../../models/userModel";
// import Order from "../../models/orderModel";
import { generateToken } from "../../utils";

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
