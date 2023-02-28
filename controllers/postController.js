const postService = require("../services/postService");
const { catchAsync } = require("../utils/errorHandler");

const getPosts = catchAsync(async (req, res) => {
  const data = await postService.getPosts(req.query);

  return res.status(200).json({ data });
});

const getPostDetail = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const data = await postService.getPostDetail(postId);

  return res.status(200).json({ data });
});

module.exports = { getPosts, getPostDetail };
