const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
const scrapRouter = require("./scrapRouter");
const commentRouter = require("./commentRouter");
const productRouter = require("./productRouter");

router.use("/users", userRouter.router);
router.use("/posts", postRouter.router);
router.use("/scraps", scrapRouter.router);
router.use("/comments", commentRouter.router);
router.use("/products", productRouter.router);

module.exports = router;
