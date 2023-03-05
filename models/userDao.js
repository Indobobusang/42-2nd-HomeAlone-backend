const { appDataSource } = require("./appDataSource");

const checkUserByKakaoId = async (kakaoId) => {
  const result = await appDataSource.query(
    `SELECT
      u.social_id AS kakaoId
    FROM users AS u
    WHERE u.social_id = ?`,
    [kakaoId]
  );
  return result;
};

const createUser = async (kakaoId, nickname, profileImage, email) => {
  return await appDataSource.query(
    `INSERT INTO
      users(
        social_id,
        nickname,
        profile_image,
        email
      ) VALUES(
        ?,
        ?,
        ?,
        ?
      )`,
    [kakaoId, nickname, profileImage, email]
  );
};

const getUserBykakaoId = async (kakaoId) => {
  const user = await appDataSource.query(
    `SELECT
      u.id,
      u.nickname,
      u.profile_image,
      u.email
    FROM users AS u
    WHERE u.social_id = ?`,
    [kakaoId]
  );
  return user;
};

module.exports = {
  checkUserByKakaoId,
  createUser,
  getUserBykakaoId,
};
