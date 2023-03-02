const request = require("supertest");

const { createApp } = require("../app");
const { appDataSource } = require("../models/appDataSource");
const userFixture = require("./fixtures/user-fixtures");
const productFixture = require("./fixtures/product-fixtures");
const postFixture = require("./fixtures/post-fixtures");
const testData = require("./fixtures/test-data");

describe("GET posts", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
    await userFixture.createUsers(testData.users);
    await productFixture.createCategories(testData.categories);
    await productFixture.createProducts(testData.products);
    await postFixture.createRoomStyles(testData.roomStyles);
    await postFixture.createPosts(testData.posts);
    await postFixture.createPostImages(testData.postImages);
    await postFixture.createImageCoordinates(testData.imageCoordinate);
  });

  afterAll(async () => {
    await appDataSource.query("SET FOREIGN_KEY_CHECKS=0");
    await appDataSource.query(`TRUNCATE image_coordinates`);
    await appDataSource.query(`TRUNCATE post_images`);
    await appDataSource.query(`TRUNCATE posts`);
    await appDataSource.query(`TRUNCATE room_styles`);
    await appDataSource.query(`TRUNCATE products`);
    await appDataSource.query(`TRUNCATE categories`);
    await appDataSource.query(`TRUNCATE users`);
    await appDataSource.query("SET FOREIGN_KEY_CHECKS=1");

    await appDataSource.destroy();
  });

  test("SUCCESS: GET POSTS WITHOUT QUERY PARAMS", async () => {
    const response = await request(app).get("/posts").query({});

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveLength(6);
  });

  test("SUCCESS: GET POSTS WITH QUERY PARAMS", async () => {
    const response = await request(app)
      .get("/posts")
      .query({ sort: "best", type: "modern" });

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveLength(3);
    expect(response.body.data[0].type).toEqual("modern");
    expect(response.body.data[1].type).toEqual("modern");
    expect(response.body.data[2].type).toEqual("modern");
  });

  test("SUCCESS: GET POSTS DETAIL", async () => {
    const response = await request(app).get("/posts/1");

    expect(response.statusCode).toEqual(200);
    expect(response.body.data[0].id).toEqual(1);
    expect(response.body.data[0].title).toEqual("모던 집들이 포스트");
  });

  test("FAILED: POST DOES NOT EXIST", async () => {
    const response = await request(app).get("/posts/0");

    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({ message: "POST DOES NOT EXIST" });
  });
});
