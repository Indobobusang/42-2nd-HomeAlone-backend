const { appDataSource } = require("./appDataSource");

const getProductById = async (productId) => {
  const [getProduct] = await appDataSource.query(
    `SELECT
      p.id AS productId,
      p.name AS productName,
      p.price AS productPrice,
      p.discount AS productDiscount,
      p.image_url AS productImage,
      p.description AS productDescription,
      p.shipping_fee AS productShippingFee,
      (p.price - p.discount) AS finalPrice,
      (p.discount / p.price) * 100 AS discountPercentage,
      COUNT(r.id) AS ratingAmount,
      (SUM(r.rating) / COUNT(r.id)) AS averageRatings
    FROM products AS p
    LEFT JOIN reviews AS r ON r.product_id = p.id
    WHERE p.id = ?`,
    [productId]
  );
  return getProduct;
};

const doesProductExist = async (productId) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT EXISTS(
        SELECT
          id
        FROM products
        WHERE id = ?
      ) AS productExist`,
      [productId]
    );

    return !!parseInt(result.productExist);
  } catch (error) {
    error.statusCode = 400;
    throw error;
  }
};

const getAllProduct = async () => {
  return await appDataSource.query(
    `SELECT
      p.id AS productId,
      p.name AS productName,
      p.image_url AS productImage
    FROM products AS p`
  );
};

module.exports = {
  getProductById,
  doesProductExist,
  getAllProduct,
};
