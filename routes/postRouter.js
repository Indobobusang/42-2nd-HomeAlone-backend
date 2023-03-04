const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

const { upload } = require("../utils/imageUploader");
const {
  loginRequired,
  getUserIdIfReqestHasToken,
} = require("../middlewares/auth");

router.get("", postController.getPosts);
router.get("/:postId", getUserIdIfReqestHasToken, postController.getPostDetail);
router.post("", loginRequired, upload.single("img"), postController.createPost);

module.exports = { router };
