const { appDataSource } = require("./appDataSource");

const postScrap = async (postId, userId) => {
  try {
    return await appDataSource.query(
      `INSERT INTO scraps (
        post_id,
        user_id
      ) VALUES ( ? , ? );
      `,
      [postId, userId]
    );
  } catch (err) {
    const error = new Error("SCRAP FAILED");
    error.statusCode = 400;
    throw error;
  }
};

const getScraps = async (userId) => {
  try {
    return await appDataSource.query(
      `SELECT
        p.id,
        s.id AS scrapId,
        pi.image_url AS imageUrl
      FROM scraps s
      INNER JOIN posts p ON s.post_id = p.id
      LEFT JOIN post_images pi ON pi.post_id = p.id
      WHERE s.user_id = ? 
      ORDER BY s.id DESC;
      `,
      [userId]
    );
  } catch (err) {
    err.statusCode = 400;
    throw err;
  }
};

const deleteScrap = async (postId, userId) => {
  try {
    const result = await appDataSource.query(
      `DELETE FROM scraps
        WHERE post_id = ? AND user_id = ? 
    `,
      [postId, userId]
    );

    if (result.affectedRows !== 1) {
      const error = new Error("DELETE FAILED");
      error.statusCode = 400;
      throw error;
    }
  } catch (err) {
    err.statusCode = 400;
    throw err;
  }
};

module.exports = { postScrap, getScraps, deleteScrap };
