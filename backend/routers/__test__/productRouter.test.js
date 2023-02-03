import { api } from "./userRouter.test";
import Product from "../../models/productModel";
import User from "../../models/userModel";
import { generateToken } from "../../utils";

describe("GET /product", () => {
  it("should return filtered products", async () => {
    const response = await api.get("/api/products?model=CRV&type=condenser");
    console.log("response body product router>>>", response.body);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    // expect(response.body[0]).toHaveProperty(
    //   "model",
    //   expect.stringMatching(/CRV/i)
    // );
    // expect(response.body[0]).toHaveProperty("type", "mobile");
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
    // console.log("response body for sorted products>>>", response.body);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    // expect(
    //   response.body.every(
    //     (product, i, products) =>
    //       i === 0 || product.rating <= products[i - 1].rating
    //   )
    // ).toBe(true);
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
});
describe("GET /product/type", () => {
  it("should return a list of product types", async () => {
    const res = await api.get("/api/products/type");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Array));
  });
});

// describe("GET /api/products/seed", () => {
//   beforeEach(async () => {
//     await User.deleteMany({});
//     await Product.deleteMany({});
//   });

//   it("should seed products and return created products", async () => {
//     const stockKeeper = new User({
//       name: "John Doe",
//       email: "johndoe@example.com",
//       password: "12345678",
//       isStockKeeper: true,
//     });
//     await stockKeeper.save();

//     const response = await api.get("/api/products/seed");

//     expect(response.status).toBe(200);
//     expect(response.body.createdProducts).toBeDefined();
//     expect(response.body.createdProducts.length).toBeGreaterThan(0);
//   });

//   it("should return 500 if no stock keeper found", async () => {
//     const response = await api.get("/api/products/seed");

//     expect(response.status).toBe(500);
//     expect(response.body.message).toBe(
//       "No stock Keeper found. first run /api/users/seed"
//     );
//   });
// });

describe("GET /api/products/:id", () => {
  it("should return a product if found", async () => {
    const product = new Product({
      make: "Test Make",
      model: "Test Model",
      type: "Test Type",
      year: 2000,
      stockQty: 10,
      price: 1000,
      rating: 4,
      numReviews: 2,
      image: "test-image.jpg",
    });
    await product.save();

    const response = await api.get(`/api/products/${product._id}`).send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("image", product.image);
    expect(response.body).toHaveProperty("rating", product.rating);
    expect(response.body).toHaveProperty("_id");
  });

  it("should return 404 if product is not found", async () => {
    const response = await api
      .get("/api/products/5ebc47e66bf23a10dc42f999")
      .send();

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "product not found");
  });
});

describe("POST /api/products", () => {
  it("should create a product if authorized", async () => {
    const stockKeeper = new User({
      name: "ten hag",
      email: "tenhage@example.com",
      password: "1234",
      isStockKeeper: true,
    });
    await stockKeeper.save();

    const product = new Product({
      image: "/images/2009 Honda CRV drier.jpg",
      type: "Ac/drier",
      make: "Honda",
      model: "Crv",
      year: "2009",
      stockQty: 0,
      price: 0,
    });

    const authToken = generateToken(stockKeeper);

    const response = await api
      .post("/api/products")
      .set("Authorization", `Bearer ${authToken}`)
      .send(product);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("product created");
    expect(response.body.product).toHaveProperty(
      "stockKeeper",
      stockKeeper._id.toString()
    );
    expect(response.body.product).toHaveProperty("image", product.image);
    expect(response.body.product).toHaveProperty("type", product.type);
    expect(response.body.product).toHaveProperty("make", product.make);
    expect(response.body.product).toHaveProperty("model", product.model);
    expect(response.body.product).toHaveProperty("year", product.year);
    expect(response.body.product).toHaveProperty("stockQty", product.stockQty);
    expect(response.body.product).toHaveProperty("price", product.price);
  });
});

describe("PUT /api/products/:id", () => {
  it("should update a product if authorized", async () => {
    const user = new User({
      name: "eva",
      email: "eva@example.com",
      password: "password",
      isStockKeeper: true,
    });
    await user.save();

    const product = new Product({
      stockKeeper: user._id,
      image: "/images/2009 Honda CRV drier.jpg",
      type: "Ac/drier",
      make: "Honda",
      model: "Crv",
      year: "2009",
      stockQty: 0,
      price: 0,
    });
    await product.save();

    const response = await api
      .put(`/api/products/${product._id}`)
      .set("Authorization", `Bearer ${generateToken(user)}`)
      .send({
        image: "/images/2010 Honda CRV drier.jpg",
        type: "Ac/drier",
        make: "Honda",
        model: "Crv",
        year: "2010",
        stockQty: 1,
        price: 100,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("updated product");
    expect(response.body.product.image).toBe(
      "/images/2010 Honda CRV drier.jpg"
    );
    expect(response.body.product.year).toBe("2010");
    expect(response.body.product.stockQty).toBe(1);
    expect(response.body.product.price).toBe(100);
  });

  it("should return 404 if product not found", async () => {
    const user = new User({
      name: "tom",
      email: "tom@example.com",
      password: "password",
      isStockKeeper: true,
    });
    await user.save();

    const productId = "63d9791b1fabea43880b3c30";

    const response = await api
      .put(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${generateToken(user)}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Product Not Found");
  });

  it("should return 401 if not authorized", async () => {
    const productId = "637381170fcwsdfa777";
    const response = await api.put(`/api/products/${productId}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("No token");
  });
});
