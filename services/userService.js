const userDao = require("../models/userDao");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const kakaoLogin = async (kakaoToken) => {
  const kakaoResonse = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      authorization: `Bearer ${kakaoToken}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  if (!kakaoResonse) {
    const error = new Error("NO KAKAO USER INFORMATION!");
    error.statusCode = 400;
    throw error;
  }
  if (kakaoResonse.status !== 200) {
    const error = new Error("KAKAOTOKEN IS INVALID!");
    error.statusCode = 400;
    throw error;
  }

  const {
    id: kakaoId,
    kakao_account: {
      profile: { nickname, profile_image_url: profileImage },
      email,
    },
  } = kakaoResonse.data;

  const checkKakaoUser = await userDao.checkUserByKakaoId(kakaoId);

  if (checkKakaoUser.length === 0) {
    const createUser = await userDao.createUser(
      kakaoId,
      nickname,
      profileImage,
      email
    );
  }

  const user = await userDao.getUserBykakaoId(kakaoId);
  const secretKey = process.env.SECRET_KEY;
  const payLoad = { userId: user.id };
  const accessToken = jwt.sign(payLoad, secretKey);
  return accessToken;
};

module.exports = {
  kakaoLogin,
};
