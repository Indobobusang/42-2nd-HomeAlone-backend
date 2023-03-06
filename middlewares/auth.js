const jwt = require("jsonwebtoken");
const { catchAsync } = require("../utils/errorHandler");

const loginRequired = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const error = new Error("TOKEN IS NOT EXIST!");
    error.statusCode = 400;
    throw error;
  }
  const secretKey = process.env.SECRET_KEY;
  const decode = jwt.verify(token, secretKey);

  if (!decode) {
    const error = new Error("USERID IS NOT EXIST!");
    error.statusCode = 400;
    throw error;
  }

  req.user = decode.userId;
  next();
});

module.exports = {
  loginRequired,
};
