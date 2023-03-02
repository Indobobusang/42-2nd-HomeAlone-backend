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
    expect(response.body.data).toEqual(getPostWithoutQuery);
  });

  test("SUCCESS: GET POSTS WITH QUERY PARAMS", async () => {
    const response = await request(app)
      .get("/posts")
      .query({ sort: "new", type: "modern" });

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toHaveLength(3);
    expect(response.body.data).toEqual(getPostWithQuery);
  });

  test("SUCCESS: GET POSTS DETAIL", async () => {
    const response = await request(app).get("/posts/1");

    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toEqual(getPostDetail);
  });

  test("FAILED: POST DOES NOT EXIST", async () => {
    const response = await request(app).get("/posts/0");

    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({ message: "POST DOES NOT EXIST" });
  });
});

const getPostWithoutQuery = [
  {
    commentCount: "0",
    id: 8,
    imageUrl: "postImage06.url",
    nickname: "testUser02",
    profileImage: "testProfileImage02.url",
    scrapCount: "0",
    title: "1800년대로의 여행",
    type: "vintage",
  },
  {
    commentCount: "0",
    id: 7,
    imageUrl: "postImage07.url",
    nickname: "testUser01",
    profileImage: "testProfileImage01.url",
    scrapCount: "0",
    title: "모던모던룸",
    type: "modern",
  },
  {
    commentCount: "0",
    id: 6,
    imageUrl: "postImage06.url",
    nickname: "testUser02",
    profileImage: "testProfileImage02.url",
    scrapCount: "0",
    title: "파스텔 핑크 인테리어",
    type: "lovely",
  },
  {
    commentCount: "0",
    id: 5,
    imageUrl: "postImage05.url",
    nickname: "testUser02",
    profileImage: "testProfileImage02.url",
    scrapCount: "0",
    title: "레트로 무드 가득",
    type: "vintage",
  },
  {
    commentCount: "0",
    id: 4,
    imageUrl: "postImage04.url",
    nickname: "testUser02",
    profileImage: "testProfileImage02.url",
    scrapCount: "0",
    title: "this is modern",
    type: "modern",
  },
  {
    commentCount: "0",
    id: 3,
    imageUrl: "postImage03.url",
    nickname: "testUser01",
    profileImage: "testProfileImage01.url",
    scrapCount: "0",
    title: "귀여움 가득! 마이룸",
    type: "lovely",
  },
];

const getPostWithQuery = [
  {
    commentCount: "0",
    id: 7,
    imageUrl: "postImage07.url",
    nickname: "testUser01",
    profileImage: "testProfileImage01.url",
    scrapCount: "0",
    title: "모던모던룸",
    type: "modern",
  },
  {
    commentCount: "0",
    id: 4,
    imageUrl: "postImage04.url",
    nickname: "testUser02",
    profileImage: "testProfileImage02.url",
    scrapCount: "0",
    title: "this is modern",
    type: "modern",
  },
  {
    commentCount: "0",
    id: 1,
    imageUrl: "postImage01.url",
    nickname: "testUser01",
    profileImage: "testProfileImage01.url",
    scrapCount: "0",
    title: "모던 집들이 포스트",
    type: "modern",
  },
];

const getPostDetail = [
  {
    id: 1,
    title: "모던 집들이 포스트",
    createdAt: "2023-02-27T11:30:14.000Z",
    description: "모던한 인테리어로 꾸며봤습니다",
    nickname: "testUser01",
    profileImage: "testProfileImage01.url",
    type: "modern",
    scrapCount: "0",
    commentCount: "0",
    postImageUrl: "postImage01.url",
    productInfo: [
      {
        name: "폭신 헤드 침대",
        pixelRow: 30,
        productId: 1,
        pixelColumn: 50,
        sellingPrice: 150000,
        productImageUrl: "productBedImage.url",
      },
      {
        name: "모던 블랙 테이블",
        pixelRow: 70,
        productId: 2,
        pixelColumn: 70,
        sellingPrice: 28000,
        productImageUrl: "productTableImage.url",
      },
    ],
  },
];
