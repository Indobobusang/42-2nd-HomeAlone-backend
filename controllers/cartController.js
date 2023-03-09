const cartService = require("../services/cartService");
const { catchAsync } = require("../utils/errorHandler");

const getCart = catchAsync(async (req, res) => {
  const userId = req.user;

  const data = await cartService.getCart(userId);

  return res.status(200).json({ data });
});

const createOrUpdateCart = catchAsync(async (req, res) => {
  const userId = req.user;

  const { productId, quantity } = req.body.data;
  const { fromCart } = req.query;

  await cartService.createOrUpdateCart(userId, productId, quantity, fromCart);

  return res.status(201).json({ message: "success" });
});

const selectCart = catchAsync(async (req, res) => {
  const userId = req.user;

  const selectedItems = req.body.data
    .filter((el) => el.isSelected)
    .map((el) => el.cartId);

  if (!selectedItems.length) {
    const error = new Error("SELECT ITEM TO ORDER");
    error.statusCode = 400;
    throw error;
  }

  await cartService.selectCart(userId, selectedItems);

  return res.status(200).json({ message: "success" });
});

const deleteCart = catchAsync(async (req, res) => {
  const userId = req.user;

  const selectedItems = req.body.data
    .filter((el) => el.isSelected)
    .map((el) => el.cartId);

  if (!selectedItems.length) {
    const error = new Error("SELECT ITEM TO DELETE");
    error.statusCode = 400;
    throw error;
  }

  const data = await cartService.deleteCart(userId, selectedItems);

  return res.status(200).json({ data });
});

module.exports = { getCart, createOrUpdateCart, selectCart, deleteCart };
