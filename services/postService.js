const postDao = require("../models/postDao");
const { DEFAULT_PAGE, DEFAULT_LIMIT } = require("../utils/constants");

const getPosts = async (query) => {
  const {
    type,
    sort,
    perPage = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
    offset,
  } = query;

  const offsetSetting = offset ? offset : (page - 1) * perPage;

  const filter = {
    type,
    sort,
    perPage,
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

  return data;
};

module.exports = { getPosts, getPostDetail };
