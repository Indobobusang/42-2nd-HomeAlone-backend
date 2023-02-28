const postDao = require("../models/postDao");
const { DEFAULT_PAGE, DEFAULT_LIMIT } = require("../utils/constants");

const getPosts = async (query) => {
  const { type, sort, page = DEFAULT_PAGE } = query;

  const offset = (page - 1) * DEFAULT_LIMIT;

  const filter = {
    type,
    sort,
    perPage: DEFAULT_LIMIT,
    offset,
  };

  return postDao.getPosts(filter);
};

const getPostDetail = async (postId) => {
  const postExist = await postDao.doesPostExist(postId);

  if (!postExist) {
    const error = new Error("POST DOES NOT EXIST");
    error.statusCode = 404;
    throw error;
  }

  return postDao.getPostDetail(postId);
};

module.exports = { getPosts, getPostDetail };
