const request = require("supertest");
const { createApp } = require("../app");
const { appDataSource } = require("../models/appDataSource");
const userFixture = require("./fixtures/user-fixtures");
const postFixture = require("./fixtures/post-fixtures");
const testUserData = require("./data/users");
const testPostData = require("./data/posts");

describe("COMMENT TEST", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
    await userFixture.createUsers(testUserData.users);
    await postFixture.createRoomStyles(testPostData.roomStyles);
    await postFixture.createPosts(testPostData.posts);
    await postFixture.createComments(testPostData.comments);
  });

  afterAll(async () => {
    await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 0`);
    await appDataSource.query(`TRUNCATE comments`);
    await appDataSource.query(`TRUNCATE posts`);
    await appDataSource.query(`TRUNCATE room_styles`);
    await appDataSource.query(`TRUNCATE users`);
    await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 1`);
    await appDataSource.query(`ALTER TABLE comments AUTO_INCREMENT = 1`);
    await appDataSource.destroy();
  });

  test("SUCCESS: GET COMMENTS BEFORE CREATING", async () => {
    const res = await request(app).get("/comments/post/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveLength(3);
    expect(res.body.data).toEqual(getComments);
  });

  test("SUCCESS: COMMENT CREATED", async () => {
    const res = await request(app)
      .post("/comments/post/1")
      .send({ userId: 1, content: "This is test comment" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({ message: "success" });
  });

  test("FAILED: CREATE COMMENT WITHOUT CONTENTS", async () => {
    const res = await request(app).post("/comments/post/1").send({ userId: 1 });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ message: "KEY_ERROR" });
  });

  test("SUCCESS: GET COMMENTS", async () => {
    const res = await request(app).get("/comments/post/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveLength(4);
    expect(res.body.data[0].content).toEqual("This is test comment");
  });

  test("SUCCESS: DELETE COMMENT", async () => {
    const res = await request(app).delete("/comments/4").send({ userId: 1 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: "success" });
  });

  test("FAILED: DELETE COMMENT", async () => {
    const res = await request(app).delete("/comments/4").send({ userId: 1 });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ message: "DELETE FAILED" });
  });

  test("SUCCESS: GET COMMENTS", async () => {
    const res = await request(app).get("/comments/post/1");

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveLength(3);
    expect(res.body.data).toEqual(getComments);
  });
});

const getComments = [
  {
    commentId: 3,
    content: "테스트 댓글 3번",
    userId: 3,
    postId: 1,
    nickname: "testUser03",
    profileImage: "testProfileImage03.url",
    createdAt: "2023-03-02T08:20:10.000Z",
  },
  {
    commentId: 2,
    content: "테스트 댓글 2번",
    userId: 2,
    postId: 1,
    nickname: "testUser02",
    profileImage: "testProfileImage02.url",
    createdAt: "2023-03-01T08:26:39.000Z",
  },
  {
    commentId: 1,
    content: "테스트 댓글 1번",
    userId: 1,
    postId: 1,
    nickname: "testUser01",
    profileImage: "testProfileImage01.url",
    createdAt: "2023-03-01T08:26:05.000Z",
  },
];
