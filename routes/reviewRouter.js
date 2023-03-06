const express = require("express");
const reviewController = require("../controllers/reviewController");
const { loginRequired } = require("../middlewares/auth");
const { upload } = require("../utils/imageUploader");

const router = express.Router();

router.get("", reviewController.getReviewByProductId);
router.post(
  "",
  loginRequired,
  upload.single("img"),
  reviewController.postProductReview
);
router.delete("", loginRequired, reviewController.deleteProductReview);

module.exports = {
  router,
};
