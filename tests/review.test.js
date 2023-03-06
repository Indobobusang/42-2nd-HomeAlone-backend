const request = require("supertest");
const jwt = require("jsonwebtoken");

const { createApp } = require("../app");
const { appDataSource } = require("../models/appDataSource");
const userFixture = require("./fixtures/user-fixtures");
const productFixture = require("./fixtures/product-fixtures");
const testUserData = require("./data/users");
const testProductData = require("./data/products");

describe("REVIEW TEST", () => {
  let app;

  const accessToken = jwt.sign({ userId: 1 }, process.env.SECRET_KEY);

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
    await userFixture.createUsers(testUserData.users);
    await productFixture.createCategories(testProductData.categories);
    await productFixture.createProducts(testProductData.products);
    await productFixture.createReviews(testProductData.reviews);
  });

  afterAll(async () => {
    await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 0`);
    await appDataSource.query(`TRUNCATE reviews`);
    await appDataSource.query(`TRUNCATE products`);
    await appDataSource.query(`TRUNCATE categories`);
    await appDataSource.query(`TRUNCATE users`);
    await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 1`);
    await appDataSource.destroy();
  });

  test("SUCCESS: GET REVIEWS BEFORE CREATING", async () => {
    const response = await request(app)
      .get("/reviews")
      .query({ productId: 1, page: 1, sort: "best" });

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toEqual(getReviews);
  });

  test("FAILED: REVIEW ID DOES NOT EXIST", async () => {
    const response = await request(app)
      .delete("/reviews")
      .set({ authorization: accessToken })
      .send();

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: "REVIEW ID DOES NOT EXIST" });
  });
});

const getReviews = [
  {
    productId: 1,
    reviewComment: "댓글1",
    reviewCreatedAt: "2023-03-05T16:55:33.000Z",
    reviewId: 1,
    reviewImage: "Image_url1",
    reviewRating: 5,
    userId: 1,
    userNickname: "testUser01",
    userProfileImage: "testProfileImage01.url",
  },
  {
    productId: 1,
    reviewComment: "댓글2",
    reviewCreatedAt: "2023-03-05T16:55:33.000Z",
    reviewId: 2,
    reviewImage: "Image_url2",
    reviewRating: 4,
    userId: 2,
    userNickname: "testUser02",
    userProfileImage: "testProfileImage02.url",
  },
  {
    productId: 1,
    reviewComment: "댓글3",
    reviewCreatedAt: "2023-03-05T16:55:33.000Z",
    reviewId: 3,
    reviewImage: "Image_url3",
    reviewRating: 3,
    userId: 3,
    userNickname: "testUser03",
    userProfileImage: "testProfileImage03.url",
  },
];
