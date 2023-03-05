const request = require("supertest");
const axios = require("axios");

const { createApp } = require("../app");
const { appDataSource } = require("../models/appDataSource");

jest.mock("axios");

describe("KAKAO LOGIN", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
  });

  afterAll(async () => {
    await appDataSource.query(`SET foreign_key_checks = 0`);
    await appDataSource.query(`TRUNCATE users`);
    await appDataSource.query(`SET foreign_key_checks = 1`);
    await appDataSource.destroy();
  });

  test("FAILED: LOGIN FAIL DUE TO NO ACCESS TOKEN", async () => {
    const response = await request(app).post("/users/kakaoLogin");

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: "KAKAOTOKEN IS NOT EXIST!" });
  });

  test("SUCCESS: LOGIN SUCCESS WITH TOKEN", async () => {
    axios.get = jest.fn().mockReturnValue({
      status: 200,
      data: {
        id: 12345,
        kakao_account: {
          profile: {
            profile_image_url: "profile_image1.png",
            nickname: "nickname1",
          },
          email: "email1234@gmail.com",
        },
      },
    });

    const response = await request(app)
      .post("/users/kakaoLogin")
      .set({ authorization: "MOCK ACCESS TOKEN" });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("accessToken");
  });

  test("FAILED: KAKAO USER INFOMATION IS NOT EXIST", async () => {
    axios.get = jest.fn().mockReturnValue();
    const response = await request(app)
      .post("/users/kakaoLogin")
      .set({ authorization: "MOCK ACCESS TOKEN" });

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: "NO KAKAO USER INFORMATION!" });
  });

  test("FAILED: KAKAOTOKEN IS INVALID!", async () => {
    axios.get = jest.fn().mockReturnValue({
      status: -401,
      data: {
        id: 12345,
        kakao_account: {
          profile: {
            profile_image_url: "profile_image1.png",
            nickname: "nickname1",
          },
          email: "email1234@gmail.com",
        },
      },
    });

    const response = await request(app)
      .post("/users/kakaoLogin")
      .set({ authorization: "MOCK ACCESS TOKEN" });

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: "KAKAOTOKEN IS INVALID!" });
  });
});
