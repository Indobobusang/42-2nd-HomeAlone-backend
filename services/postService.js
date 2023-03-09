const postDao = require("../models/postDao");
const userDao = require("../models/userDao");
const { DEFAULT_PAGE, DEFAULT_LIMIT } = require("../utils/constants");

const getPosts = async (query) => {
  const { type, sort, perPage, page, offset } = query;

  const pageSetting = +page ? +page : DEFAULT_PAGE;
  const limitSetting = +perPage ? +perPage : DEFAULT_LIMIT;
  const offsetSetting = +offset ? +offset : (pageSetting - 1) * limitSetting;

  const filter = {
    type,
    sort,
    perPage: limitSetting,
    offset: offsetSetting,
  };

  return postDao.getPosts(filter);
};

const getPostDetail = async (postId, userId) => {
  const postExist = await postDao.doesPostExist(postId);

  if (!postExist) {
    const error = new Error("POST DOES NOT EXIST");
    error.statusCode = 404;
    throw error;
  }
  const [data] = await postDao.getPostDetail(postId);
  data.isScrapped = await postDao.isPostScrapped(postId, userId);

  const user = await userDao.getUserByUserId(userId);

  return { data, user };
};

const createPost = async (userId, postData, image) => {
  return await postDao.createPost(userId, postData, image);
};

module.exports = { getPosts, getPostDetail, createPost };
