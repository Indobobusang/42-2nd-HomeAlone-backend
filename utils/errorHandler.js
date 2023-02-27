const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => next(err));
  };
};

const globalErrorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.statuscode || 500).json({ message: err.message || "ERROR" });
};

module.exports = {
  catchAsync,
  globalErrorHandler,
};
