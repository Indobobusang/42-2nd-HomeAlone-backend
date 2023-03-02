const { appDataSource } = require("../../models/appDataSource");

const createRoomStyles = (roomStyleList) => {
  const data = [];

  for (const roomStyle of roomStyleList) {
    data.push([roomStyle.id, roomStyle.type]);
  }

  return appDataSource.query(
    `
    INSERT INTO room_styles (
      id,
      type
    ) VALUES ?
  `,
    [data]
  );
};

const createPosts = (postList) => {
  const data = [];

  for (const post of postList) {
    data.push([
      post.id,
      post.title,
      post.description,
      post.user_id,
      post.room_style_id,
    ]);
  }

  return appDataSource.query(
    `
    INSERT INTO posts (
      id,
      title,
      description,
      user_id,
      room_style_id
    ) VALUES ?
  `,
    [data]
  );
};

const createPostImages = (postImageList) => {
  const data = [];

  for (const postImage of postImageList) {
    data.push([postImage.id, postImage.image_url, postImage.post_id]);
  }

  return appDataSource.query(
    `
    INSERT INTO post_images (
      id,
      image_url,
      post_id
    ) VALUES ?
  `,
    [data]
  );
};

const createImageCoordinates = (imageCoordinateList) => {
  const data = [];

  for (const imageCoordinate of imageCoordinateList) {
    data.push([
      imageCoordinate.id,
      imageCoordinate.pixel_row,
      imageCoordinate.pixel_column,
      imageCoordinate.post_image_id,
      imageCoordinate.product_id,
    ]);
  }

  return appDataSource.query(
    `
    INSERT INTO image_coordinates (
      id,
      pixel_row,
      pixel_column,
      post_image_id,
      product_id
    ) VALUES ?
  `,
    [data]
  );
};

module.exports = {
  createRoomStyles,
  createPosts,
  createPostImages,
  createImageCoordinates,
};
