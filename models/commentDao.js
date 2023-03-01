const { appDataSource } = require("./appDataSource");

const getComments = async (postId) => {
  try {
    return await appDataSource.query(
      `SELECT
        c.id AS commentId,
        c.content,
        c.post_id AS postId,
        c.created_at AS createdAt,
        u.id AS userId,
        u.nickname,
        u.profile_image AS profileImage
      FROM comments c
      LEFT JOIN users u ON u.id = c.user_id
      WHERE c.post_id = ?
      ORDER BY c.id DESC; 
      `,
      [postId]
    );
  } catch (err) {
    err.statusCode = 400;
    throw err;
  }
};

const postComment = async (postId, userId, content) => {
  try {
    return await appDataSource.query(
      `INSERT INTO comments
        (
          post_id,
          user_id,
          content
        ) VALUES (?, ?, ?);
      `,
      [postId, userId, content]
    );
  } catch (err) {
    err.statusCode = 400;
    throw err;
  }
};

const deleteComment = async (commentId, userId) => {
  try {
    const result = await appDataSource.query(
      `DELETE FROM comments
        WHERE id = ? AND user_id = ?;
      `,
      [commentId, userId]
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

module.exports = { getComments, postComment, deleteComment };
