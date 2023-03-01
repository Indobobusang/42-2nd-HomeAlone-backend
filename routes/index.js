const express = require("express");
const router = express.Router();
const postRouter = require("./postRouter");

router.use("/posts", postRouter.router);

const commentRouter = require("./commentRouter");

router.use("/comments", commentRouter.router);

module.exports = router;
