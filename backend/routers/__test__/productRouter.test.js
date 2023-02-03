import { api } from "./userRouter.test";
// import Product from "../../models/productModel";

describe("GET /product", () => {
  it("should return filtered products", async () => {
    const response = await api.get("/api/products?model=iPhone&type=mobile");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty(
      "model",
      expect.stringMatching(/iPhone/i)
    );
    expect(response.body[0]).toHaveProperty("type", "mobile");
  });

  it("should return products sorted by price (lowest first)", async () => {
    const response = await api.get("/api/products?order=lowest");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(
      response.body.every(
        (product, i, products) =>
          i === 0 || product.price >= products[i - 1].price
      )
    ).toBe(true);
  });

  it("should return products sorted by price (highest first)", async () => {
    const response = await api.get("/api/products?order=highest");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(
      response.body.every(
        (product, i, products) =>
          i === 0 || product.price <= products[i - 1].price
      )
    ).toBe(true);
  });

  it("should return products sorted by rating (highest first)", async () => {
    const response = await api.get("/api/products?order=toprated");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(
      response.body.every(
        (product, i, products) =>
          i === 0 || product.rating <= products[i - 1].rating
      )
    ).toBe(true);
  });

  it("should return products filtered by price", async () => {
    const response = await api.get("/api/products?min=100&max=200");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(
      response.body.every(
        (product) => product.price >= 100 && product.price <= 200
      )
    ).toBe(true);
  });

  it("should return products filtered by rating", async () => {
    const response = await api.get("/api/products?rating=4");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.every((product) => product.rating >= 4)).toBe(true);
  });
}, 10000);
