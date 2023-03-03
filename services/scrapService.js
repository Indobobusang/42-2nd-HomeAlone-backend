const scrapDao = require("../models/scrapDao");

const postScrap = async (postId, userId) => {
  return await scrapDao.postScrap(postId, userId);
};

const getScraps = async (userId) => {
  return await scrapDao.getScraps(userId);
};

const deleteScrap = async (postId, userId) => {
  return await scrapDao.deleteScrap(postId, userId);
};

module.exports = { postScrap, getScraps, deleteScrap };
