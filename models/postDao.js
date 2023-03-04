const { appDataSource } = require("./appDataSource");
const { PostQueryBuilder, roomStyleEnum } = require("./postQueryBuilder");

const getPosts = async (filter) => {
  try {
    const filterQuery = new PostQueryBuilder(
      filter.perPage,
      filter.offset,
      filter.sort,
      filter.type
    ).build();

    return appDataSource.query(
      `SELECT 
        p.id,
        p.title,
        u.nickname,
        u.profile_image AS profileImage,
        rs.type,
        pi.image_url AS imageUrl,
        COALESCE(sc.scrapCount, 0) AS scrapCount,
        COALESCE(cc.commentCount, 0) AS commentCount
      FROM posts p
      LEFT JOIN users u ON u.id = p.user_id
      LEFT JOIN room_styles rs ON rs.id = p.room_style_id
      LEFT JOIN post_images pi ON pi.post_id = p.id
      LEFT JOIN (
          SELECT 
            COUNT(id) AS scrapCount, 
            post_id 
          FROM scraps 
          GROUP BY post_id
        ) sc 
        ON sc.post_id = p.id
      LEFT JOIN (
          SELECT 
            COUNT(id) AS commentCount, 
            post_id 
          FROM comments 
          GROUP BY post_id
        ) cc 
        ON cc.post_id = p.id
        ${filterQuery}
      `
    );
  } catch (err) {
    err.statusCode = 400;
    throw err;
  }
};

const getPostDetail = async (postId) => {
  try {
    return appDataSource.query(
      `SELECT 
        p.id,
        p.title,
        p.created_at AS createdAt,
        p.description,
        u.nickname,
        u.profile_image AS profileImage,
        rs.type,
        COALESCE(sc.scrapCount, 0) AS scrapCount,
        COALESCE(cc.commentCount, 0) AS commentCount,
        pi.image_url AS postImageUrl,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "productId", products.id, 
            "name", products.name, 
            "sellingPrice", products.price - products.discount, 
            "productImageUrl", products.image_url,
            "pixelRow", ic.pixel_row, 
            "pixelColumn", ic.pixel_column 
          )
        ) AS productInfo
        FROM posts p
        LEFT JOIN users u ON u.id = p.user_id
        LEFT JOIN room_styles rs ON rs.id = p.room_style_id
        LEFT JOIN post_images pi ON pi.post_id = p.id
        LEFT JOIN image_coordinates ic ON ic.post_image_id = pi.id
        LEFT JOIN products ON ic.product_id = products.id
        LEFT JOIN (
          SELECT 
            COUNT(id) AS scrapCount, 
            post_id 
          FROM scraps 
          GROUP BY post_id
        ) sc ON sc.post_id = p.id
        LEFT JOIN (
          SELECT 
            COUNT(id) AS commentCount, 
            post_id 
          FROM comments 
          GROUP BY post_id
        ) cc ON cc.post_id = p.id
        WHERE p.id = ?
        GROUP BY p.id, p.title, p.created_at, p.description, u.nickname, u.profile_image, rs.type, pi.image_url, pi.id ;
      `,
      [postId]
    );
  } catch (err) {
    err.statusCode = 400;
    throw err;
  }
};

const doesPostExist = async (postId) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT EXISTS(
        SELECT
          id
        FROM posts
        WHERE id = ?
      ) AS postExist`,
      [postId]
    );

    return !!parseInt(result.postExist);
  } catch (err) {
    err.statusCode = 400;
    throw err;
  }
};

const createPost = async (userId, postData, image) => {
  const queryrunner = appDataSource.createQueryRunner();
  await queryrunner.connect();
  await queryrunner.startTransaction();

  try {
    const post = await queryrunner.query(
      `INSERT INTO posts(
        title,
        description,
        room_style_id,
        user_id
      ) VALUES (?, ?, ?, ?)
      `,
      [
        postData.title,
        postData.description,
        roomStyleEnum[postData.type],
        userId,
      ]
    );

    const postImage = await queryrunner.query(
      `INSERT INTO post_images (
        image_url,
        post_id
      ) VALUES (?, ?)
      `,
      [image.location, post.insertId]
    );

    if (postData.productInfo.length) {
      const imageCoordinates = postData.productInfo.map((el) => {
        return [el.pixelRow, el.pixelColumn, el.productId, postImage.insertId];
      });

      await queryrunner.query(
        `INSERT INTO image_coordinates (
          pixel_row,
          pixel_column,
          product_id,
          post_image_id
        ) VALUES ? 
      `,
        [imageCoordinates]
      );
    }

    await queryrunner.commitTransaction();
  } catch (err) {
    await queryrunner.rollbackTransaction();
    const error = new Error("CREATE POST FAILED");
    error.statusCode = 400;
    throw err;
  } finally {
    await queryrunner.release();
  }
};

const isPostScrapped = async (postId, userId) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT EXISTS (
        SELECT 
        id AS scrapId
      FROM scraps
      WHERE post_id = ? AND user_id = ? 
      ) AS isScrapped
      `,
      [postId, userId]
    );

    return !!parseInt(result.isScrapped);
  } catch (err) {
    err.statusCode = 400;
    throw err;
  }
};

module.exports = {
  getPosts,
  getPostDetail,
  doesPostExist,
  createPost,
  isPostScrapped,
};
