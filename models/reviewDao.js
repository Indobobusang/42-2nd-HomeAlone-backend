const { appDataSource } = require("./appDataSource");
const { sortQueryBuilder } = require("./QueryBuilder");

const getReviewByProductId = async (productId, sort, offset) => {
  return await appDataSource.query(
    `SELECT
      p.id AS productId,
      p.name AS productName,
      u.id AS userId,
      u.nickname AS userNickname,
      u.profile_image AS userProfileImage,
      r.id AS reviewId,
      r.content AS reviewContent,
      r.image_url AS reviewImage,
      r.rating AS reviewRating,
      r.created_at AS reviewCreatedAt
    FROM reviews AS r
    INNER JOIN products AS p ON p.id = r.product_id
    INNER JOIN users AS u ON u.id = r.user_id
    WHERE r.product_id = ?
    ${sortQueryBuilder(sort)}
    LIMIT ?,4`,
    [productId, offset]
  );
};

const postProductReview = async (userId, productId, rating, image, content) => {
  return await appDataSource.query(
    `INSERT INTO reviews
      (
        user_id,
        product_id,
        rating,
        image_url,
        content
      ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?
      )`,
    [userId, productId, rating, image.location, content]
  );
};

const deleteProductReview = async (userId, reviewId) => {
  return await appDataSource.query(
    `DELETE FROM reviews
      WHERE user_id = ? AND id = ?`,
    [userId, reviewId]
  );
};

module.exports = {
  getReviewByProductId,
  postProductReview,
  deleteProductReview,
};
