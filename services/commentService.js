const commentDao = require("../models/commentDao");

const getComments = async (postId) => {
  return await commentDao.getComments(postId);
};

const postComment = async (postId, userId, content) => {
  return await commentDao.postComment(postId, userId, content);
};

const deleteComment = async (commentId, userId) => {
  return await commentDao.deleteComment(commentId, userId);
};

module.exports = { getComments, postComment, deleteComment };
