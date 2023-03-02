const { appDataSource } = require("../../models/appDataSource");

const createUsers = (userList) => {
  const data = [];

  for (const user of userList) {
    data.push([
      user.id,
      user.email,
      user.profile_image,
      user.password,
      user.nickname,
    ]);
  }

  return appDataSource.query(
    `
    INSERT INTO users (
      id,
      email,
      profile_image,
      password,
      nickname
    ) VALUES ?
  `,
    [data]
  );
};

module.exports = { createUsers };
