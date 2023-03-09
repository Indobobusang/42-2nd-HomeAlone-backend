const { appDataSource } = require("./appDataSource");

const getCart = async (userId) => {
  try {
    return await appDataSource.query(
      `SELECT
        c.id AS cartId, 
        p.id AS productId,
        p.name,
        p.price,
        p.discount,
        p.shipping_fee AS shippingFee,
        p.image_url AS imageUrl,
        c.is_selected AS isSelected,
        c.quantity
      FROM carts c
      INNER JOIN products p ON p.id = c.product_id
      WHERE c.user_id = ?
      ORDER BY c.id DESC;
      `,
      [userId]
    );
  } catch (err) {
    err.statusCode = 400;
    throw err;
  }
};

const createOrUpdateCart = async (userId, productId, quantity, fromCart) => {
  try {
    const updateClauses = fromCart === "" ? `?` : `quantity + ?`;

    return await appDataSource.query(
      `INSERT INTO carts
      (
        user_id,
        product_id,
        quantity
      ) VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        quantity = ${updateClauses};
    `,
      [userId, productId, quantity, quantity]
    );
  } catch (err) {
    err.statusCode = 400;
    throw err;
  }
};

const clearSelectedItems = async (userId) => {
  try {
    await appDataSource.query(
      `UPDATE carts
      SET is_selected = false
      WHERE user_id = ?
    `,
      [userId]
    );
  } catch (err) {
    err.statusCode = 400;
    throw err;
  }
};

const selectCartItems = async (userId, selectedItems) => {
  try {
    return await appDataSource.query(
      `UPDATE carts
         SET is_selected = true
         WHERE id IN ( ? ) AND user_id = ?
        `,
      [selectedItems, userId]
    );
  } catch (err) {
    err.statusCode = 400;
    throw err;
  }
};

const deleteCart = async (userId, selectedItems) => {
  try {
    return await appDataSource.query(
      `DELETE FROM carts
    WHERE id IN ( ? ) AND user_id = ?`,
      [selectedItems, userId]
    );
  } catch (err) {
    const error = new Error("DELETE FAILED");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  getCart,
  createOrUpdateCart,
  clearSelectedItems,
  selectCartItems,
  deleteCart,
};
