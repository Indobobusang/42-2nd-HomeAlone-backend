const express = require("express");
const router = express.Router();
const { loginRequired } = require("../middlewares/auth");

const commentController = require("../controllers/commentController");

router.get("/post/:postId", commentController.getComments);
router.post("/post/:postId", loginRequired, commentController.postComment);
router.delete("/:commentId", loginRequired, commentController.deleteComment);

module.exports = { router };
