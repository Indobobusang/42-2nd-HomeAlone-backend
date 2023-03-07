const express = require("express");
const postController = require("../controllers/postController");
const { getUserIdIfReqestHasToken } = require("../middlewares/auth");

const router = express.Router();

router.get("", postController.getPosts);
router.get("/:postId", getUserIdIfReqestHasToken, postController.getPostDetail);

module.exports = { router };
