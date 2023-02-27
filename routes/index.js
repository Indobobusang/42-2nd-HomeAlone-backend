const express = require("express");
const router = express.Router();
const postRouter = require("./postRouter");

router.use("/posts", postRouter.router);

const userRouter = require("./userRouter");
const commentRouter = require("./commentRouter");

router.use("/users", userRouter.router);
router.use("/comments", commentRouter.router);

module.exports = router;
