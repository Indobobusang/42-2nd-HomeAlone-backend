const postService = require("../services/postService");
const { catchAsync } = require("../utils/errorHandler");
const { deleteImage } = require("../utils/imageUploader");

const getPosts = catchAsync(async (req, res) => {
  const data = await postService.getPosts(req.query);

  return res.status(200).json({ data });
});

const getPostDetail = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user;

  const data = await postService.getPostDetail(postId, userId);

  return res.status(200).json({ data: [data] });
});

const createPost = catchAsync(async (req, res) => {
  const image = req.file;

  if (!image) {
    const error = new Error("IMAGE UPLOAD FAILED");
    error.statusCode = 400;
    throw error;
  }

  try {
    const userId = req.user;
    const { title, description, type, productInfo } = req.body;

    if (!title || !type || !productInfo) {
      const error = new Error("KEY ERROR");
      error.statusCode = 400;
      throw error;
    }

    const postData = {
      title,
      description,
      type: type.toUpperCase(),
      productInfo: JSON.parse(productInfo),
    };

    await postService.createPost(userId, postData, image);

    return res.status(201).json({ message: "success" });
  } catch (err) {
    deleteImage(image.key);
    throw err;
  }
});

module.exports = { getPosts, getPostDetail, createPost };
