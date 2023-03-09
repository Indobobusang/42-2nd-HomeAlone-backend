const scrapService = require("../services/scrapService");
const { catchAsync } = require("../utils/errorHandler");

const postScrap = catchAsync(async (req, res) => {
  const { postId } = req.body;
  const userId = req.user;

  if (!postId) {
    const error = new Error("KEY ERROR");
    error.statusCode = 400;
    throw error;
  }

  await scrapService.postScrap(postId, userId);

  return res.status(201).json({ message: "success" });
});

const getScraps = catchAsync(async (req, res) => {
  const userId = req.user;

  const { collections, user } = await scrapService.getScraps(userId);

  return res.status(200).json({ collections, user });
});

const deleteScrap = catchAsync(async (req, res) => {
  const { postId } = req.body;
  const userId = req.user;

  if (!postId) {
    const error = new Error("KEY ERROR");
    error.statusCode = 400;
    throw error;
  }

  await scrapService.deleteScrap(postId, userId);

  return res.status(200).json({ message: "success" });
});

module.exports = { postScrap, getScraps, deleteScrap };
