const express = require("express");
const orderController = require("../controllers/orderController");
const { loginRequired } = require("../middlewares/auth");

const router = express.Router();

router.get("/user", loginRequired, orderController.getOrderUserInfo);
router.get("/cart", loginRequired, orderController.getOrderCartInfo);
router.post("/delivery", loginRequired, orderController.postOrderDeliveryInfo);
router.get("/delivery", loginRequired, orderController.getOrderDeliveryInfo);
router.post("/payment", loginRequired, orderController.createPaymentByUser);

module.exports = {
  router,
};
