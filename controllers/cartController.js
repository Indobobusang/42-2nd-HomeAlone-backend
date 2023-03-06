const cartService = require("../services/cartService");
const { catchAsync } = require("../utils/errorHandler");

const getCart = catchAsync(async (req, res) => {
  const userId = req.user;

  const data = await cartService.getCart(userId);

  return res.status(200).json({ data });
});

const createOrUpdateCart = catchAsync(async (req, res) => {
  const userId = req.user;
  const { productId, quantity } = req.body;
  const { fromCart } = req.query;

  console.log(req.body);

  await cartService.createOrUpdateCart(userId, productId, quantity, fromCart);

  return res.status(201).json({ message: "success" });
});

const selectCart = catchAsync(async (req, res) => {
  const userId = req.user;
  const userCartList = req.body.data;

  const selectedItems = userCartList
    .filter((el) => el.isSelected === true)
    .map((el) => [el.cartId]);

  await cartService.selectCart(userId, selectedItems);

  return res.status(200).json({ message: "success" });
});

const deleteCart = catchAsync(async (req, res) => {
  const userId = req.user;
  const userCartList = req.body.data;

  const selectedItems = userCartList
    .filter((el) => el.isSelected === true)
    .map((el) => [el.cartId]);

  await cartService.deleteCart(userId, selectedItems);

  return res.status(200).json({ message: "success" });
});

module.exports = { getCart, createOrUpdateCart, selectCart, deleteCart };
