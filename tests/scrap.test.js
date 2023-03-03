const request = require("supertest");

const { createApp } = require("../app");
const { appDataSource } = require("../models/appDataSource");
const userFixture = require("./fixtures/user-fixtures");
const productFixture = require("./fixtures/product-fixtures");
const postFixture = require("./fixtures/post-fixtures");
const testUserData = require("./data/users");
const testProductData = require("./data/products");
const testPostData = require("./data/posts");

describe("SCRAP TEST", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
    await userFixture.createUsers(testUserData.users);
    await productFixture.createCategories(testProductData.categories);
    await productFixture.createProducts(testProductData.products);
    await postFixture.createRoomStyles(testPostData.roomStyles);
    await postFixture.createPosts(testPostData.posts);
    await postFixture.createPostImages(testPostData.postImages);
    await postFixture.createImageCoordinates(testPostData.imageCoordinate);
  });

  afterAll(async () => {
    await appDataSource.query("SET FOREIGN_KEY_CHECKS=0");
    await appDataSource.query(`TRUNCATE scraps`);
    await appDataSource.query(`TRUNCATE image_coordinates`);
    await appDataSource.query(`TRUNCATE post_images`);
    await appDataSource.query(`TRUNCATE posts`);
    await appDataSource.query(`TRUNCATE room_styles`);
    await appDataSource.query(`TRUNCATE products`);
    await appDataSource.query(`TRUNCATE categories`);
    await appDataSource.query(`TRUNCATE users`);
    await appDataSource.query(`ALTER TABLE scraps AUTO_INCREMENT = 1`);
    await appDataSource.query("SET FOREIGN_KEY_CHECKS=1");

    await appDataSource.destroy();
  });

  const accesstoken = process.env.TEST_ACCESS_TOKEN;

  test("SUCCESS: IS POST SCRAPPED - NOT LOGGED IN", async () => {
    const res = await request(app).get("/posts/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body.data[0].isScrapped).toEqual(false);
  });

  test("SUCCESS: IS POST SCRAPPED - LOGIN USER BEFORE SCRAP", async () => {
    const res = await request(app)
      .get("/posts/1")
      .set("Authorization", accesstoken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data[0].isScrapped).toEqual(false);
  });

  test("SUCCESS: POST SCRAP", async () => {
    const res = await request(app)
      .post("/scraps")
      .set("Authorization", accesstoken)
      .send({ postId: 1 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({ message: "success" });
  });

  test("SUCCESS: IS POST SCRAPPED - AFTER SCRAP", async () => {
    const res = await request(app)
      .get("/posts/1")
      .set("Authorization", accesstoken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data[0].isScrapped).toEqual(true);
  });

  test("FAILED: POST SCRAP - ALREADY SCRAPPED", async () => {
    const res = await request(app)
      .post("/scraps")
      .set("Authorization", accesstoken)
      .send({ postId: 1 });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ message: "SCRAP FAILED" });
  });

  test("SUCCESS: GET SCRAPS", async () => {
    const res = await request(app)
      .get("/scraps")
      .set("Authorization", accesstoken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toEqual([
      { id: 1, imageUrl: "postImage01.url", scrapId: 1 },
    ]);
  });

  test("FAILED: DELETE SCRAP - KEY ERROR", async () => {
    const res = await request(app)
      .delete("/scraps")
      .set("Authorization", accesstoken);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ message: "KEY ERROR" });
  });

  test("SUCCESS: DELETE SCRAP", async () => {
    const res = await request(app)
      .delete("/scraps")
      .set("Authorization", accesstoken)
      .send({ postId: 1 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: "success" });
  });

  test("FAILED: DELETE SCRAP - SCRAP DOES NOT EXIST", async () => {
    const res = await request(app)
      .delete("/scraps")
      .set("Authorization", accesstoken)
      .send({ postId: 1 });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ message: "DELETE FAILED" });
  });
});
