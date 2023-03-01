const express = require("express");
const router = express.Router();

const commentController = require("../controllers/commentController");

router.get("/post/:postId", commentController.getComments);
router.post("/post/:postId", commentController.postComment);
router.delete("/:commentId", commentController.deleteComment);

module.exports = { router };
