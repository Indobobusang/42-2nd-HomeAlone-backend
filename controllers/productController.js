const productService = require("../services/productService");
const { catchAsync } = require("../utils/errorHandler");

const getProductById = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const productDetail = await productService.getProductById(productId);
  res.status(200).json({ data: productDetail });
});

const getAllProduct = catchAsync(async (req, res) => {
  const allProduct = await productService.getAllProduct();
  res.status(200).json({ data: allProduct });
});

module.exports = {
  getProductById,
  getAllProduct,
};
