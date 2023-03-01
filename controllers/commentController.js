const commentService = require("../services/commentService");
const { catchAsync } = require("../utils/errorHandler");

const getComments = catchAsync(async (req, res) => {
  const { postId } = req.params;

  const data = await commentService.getComments(postId);

  return res.status(200).json({ data });
});

const postComment = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const { userId, content } = req.body;

  if (!content) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;
    throw error;
  }

  await commentService.postComment(postId, userId, content);

  return res.status(201).json({ message: "success" });
});

const deleteComment = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.body;

  await commentService.deleteComment(commentId, userId);

  return res.status(200).json({ message: "success" });
});

module.exports = { getComments, postComment, deleteComment };
