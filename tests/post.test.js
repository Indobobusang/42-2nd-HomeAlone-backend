const request = require("supertest");

const { createApp } = require("../app");
const { appDataSource } = require("../models/appDataSource");

describe("GET posts", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
  });

  afterAll(async () => {
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
  });

  test("SUCCESS: GET POSTS DETAIL", async () => {
    const response = await request(app).get("/posts/1");

    expect(response.statusCode).toEqual(200);
    expect(response.body.data.id).toEqual(1);
  });

  test("FAILED: POST DOES NOT EXIST", async () => {
    const response = await request(app).get("/posts/0");

    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({ message: "POST DOES NOT EXIST" });
  });
});
