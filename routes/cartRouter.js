const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const { loginRequired } = require("../middlewares/auth");

router.get("", loginRequired, cartController.getCart);
router.post("", loginRequired, cartController.createOrUpdateCart);
router.patch("", loginRequired, cartController.selectCart);
router.delete("", loginRequired, cartController.deleteCart);

module.exports = { router };
