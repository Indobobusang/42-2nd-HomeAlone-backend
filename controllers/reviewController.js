const reviewService = require("../services/reviewService");
const { catchAsync } = require("../utils/errorHandler");
const { deleteImage } = require("../utils/imageUploader");

const getReviewByProductId = catchAsync(async (req, res) => {
  const { productId, sort = "best", page = 1 } = req.query;

  const getReviews = await reviewService.getReviewByProductId(
    +productId,
    sort,
    +page
  );
  res.status(200).json({ data: getReviews });
});

const postProductReview = catchAsync(async (req, res) => {
  const image = req.file;

  if (!image) {
    const error = new Error("IMAGE UPLOAD FAILED");
    error.statusCode = 400;
    throw error;
  }

  try {
    const userId = req.user;
    const { productId, rating, content } = req.body;

    if (!rating || !image || !content) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    await reviewService.postProductReview(
      userId,
      productId,
      +rating,
      image,
      content
    );
    res.status(200).json({ message: "리뷰가 등록되었습니다." });
  } catch (err) {
    deleteImage(image.key);
    throw err;
  }
});

const deleteProductReview = catchAsync(async (req, res) => {
  const userId = req.user;
  const { reviewId } = req.body;

  if (!reviewId) {
    const error = new Error("REVIEW ID DOES NOT EXIST");
    error.statusCode = 400;
    throw error;
  }

  await reviewService.deleteProductReview(userId, reviewId);
  res.status(200).json({ message: "리뷰가 지워졌습니다" });
});

module.exports = {
  getReviewByProductId,
  postProductReview,
  deleteProductReview,
};
