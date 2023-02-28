const { appDataSource } = require("./appDataSource");
const { PostQueryBuilder } = require("./postQueryBuilder");

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

module.exports = { getPosts, getPostDetail, doesPostExist };
