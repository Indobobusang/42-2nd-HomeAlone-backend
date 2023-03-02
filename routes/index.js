const express = require("express");
const router = express.Router();

const postRouter = require("./postRouter");
const userRouter = require("./userRouter");
const commentRouter = require("./commentRouter");
const productRouter = require("./productRouter");

router.use("/posts", postRouter.router);
router.use("/users", userRouter.router);
router.use("/comments", commentRouter.router);
router.use("/products", productRouter.router);

module.exports = router;
