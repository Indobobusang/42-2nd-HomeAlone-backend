const reviewDao = require("../models/reviewDao");

const getReviewByProductId = async (productId, sort, page) => {
  const offset = page ? (page - 1) * 4 : 0;

  return await reviewDao.getReviewByProductId(productId, sort, offset);
};

const postProductReview = async (userId, productId, rating, image, content) => {
  return await reviewDao.postProductReview(
    userId,
    productId,
    rating,
    image,
    content
  );
};

const deleteProductReview = async (userId, reviewId) => {
  return await reviewDao.deleteProductReview(userId, reviewId);
};

module.exports = {
  getReviewByProductId,
  postProductReview,
  deleteProductReview,
};
