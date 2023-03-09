const scrapDao = require("../models/scrapDao");
const userDao = require("../models/userDao");

const postScrap = async (postId, userId) => {
  return await scrapDao.postScrap(postId, userId);
};

const getScraps = async (userId) => {
  const collections = await scrapDao.getScraps(userId);
  const user = await userDao.getUserByUserId(userId);

  return { collections, user };
};

const deleteScrap = async (postId, userId) => {
  return await scrapDao.deleteScrap(postId, userId);
};

module.exports = { postScrap, getScraps, deleteScrap };
