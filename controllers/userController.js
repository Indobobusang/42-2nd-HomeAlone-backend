const userService = require("../services/userService");
const { catchAsync } = require("../utils/errorHandler");

const kakaoLogin = catchAsync(async (req, res) => {
  const kakaoToken = req.headers.authorization;

  if (!kakaoToken) {
    const error = new Error("KAKAOTOKEN IS NOT EXIST!");
    error.statusCode = 400;
    throw error;
  }

  const accessToken = await userService.kakaoLogin(kakaoToken);
  return res.status(200).json({ accessToken: accessToken });
});

module.exports = {
  kakaoLogin,
};
