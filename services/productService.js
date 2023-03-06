const productDao = require("../models/productDao");

const getProductById = async (productId) => {
  const productExist = await productDao.doesProductExist(productId);

  if (!productExist) {
    const error = new Error("PRODUCT ID DOES NOT EXIST!");
    error.statusCode = 400;
    throw error;
  }

  const getProduct = await productDao.getProductById(productId);

  return getProduct;
};

const getAllProduct = async () => {
  return await productDao.getAllProduct();
};

module.exports = {
  getProductById,
  getAllProduct,
};
