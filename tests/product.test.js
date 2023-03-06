const request = require("supertest");

const { createApp } = require("../app");
const { appDataSource } = require("../models/appDataSource");
const userFixture = require("./fixtures/user-fixtures");
const productFixture = require("./fixtures/product-fixtures");
const testUserData = require("./data/users");
const testProductData = require("./data/products");

describe("PRODUCT DETAIL", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
    await userFixture.createUsers(testUserData.users);
    await productFixture.createCategories(testProductData.categories);
    await productFixture.createProducts(testProductData.products);
    await productFixture.createReviews(testProductData.reviews);
  });

  afterAll(async () => {
    await appDataSource.query(`SET foreign_key_checks = 0`);
    await appDataSource.query(`TRUNCATE reviews`);
    await appDataSource.query(`TRUNCATE products`);
    await appDataSource.query(`TRUNCATE categories`);
    await appDataSource.query(`TRUNCATE users`);
    await appDataSource.query(`SET foreign_key_checks = 1`);
    await appDataSource.destroy();
  });

  test("FAILED: PRODUCT ID DOES NOT EXIST", async () => {
    const response = await request(app).get("/products/detail/5");

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: "PRODUCT ID DOES NOT EXIST!" });
  });

  test("SUCCESS: GET ALL PRODUCT", async () => {
    const response = await request(app).get("/products");

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toEqual(allProducts);
  });

  test("SUCCESS: GET PRODUCT DETAIL BY ID", async () => {
    const response = await request(app).get("/products/detail/1");

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toEqual(productDetails);
  });
});

const allProducts = [
  {
    productId: 1,
    productName: "폭신 헤드 침대",
    productImage: "productBedImage.url",
  },
  {
    productId: 2,
    productName: "모던 블랙 테이블",
    productImage: "productTableImage.url",
  },
  {
    productId: 3,
    productName: "스툴 의자",
    productImage: "productChairImage.url",
  },
  {
    productId: 4,
    productName: "라운드 무드 램프",
    productImage: "productLampImage.url",
  },
];

const productDetails = {
  averageRatings: "4.0000",
  discountPercentage: "25.000000",
  finalPrice: "150000.00",
  productDescription: "모던하면서 포근한 분위기를 만들어주는 침대입니다",
  productDiscount: "50000.00",
  productId: 1,
  productImage: "productBedImage.url",
  productName: "폭신 헤드 침대",
  productPrice: "200000.00",
  productShippingFee: "3000.00",
  ratingAmount: "3",
};
