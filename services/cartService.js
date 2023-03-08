const cartDao = require("../models/cartDao");

const getCart = async (userId) => {
  return await cartDao.getCart(userId);
};

const createOrUpdateCart = async (userId, productId, quantity, fromCart) => {
  return await cartDao.createOrUpdateCart(
    userId,
    productId,
    quantity,
    fromCart
  );
};

const selectCart = async (userId, selectedItems) => {
  return await cartDao.selectCart(userId, selectedItems);
};

const deleteCart = async (userId, selectedItems) => {
  await cartDao.deleteCart(userId, selectedItems);

  return await cartDao.getCart(userId);
};

module.exports = { getCart, createOrUpdateCart, selectCart, deleteCart };
