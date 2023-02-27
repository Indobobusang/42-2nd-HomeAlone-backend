const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const { globalErrorHandler } = require("./utils/errorHandler");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));

  app.use(routes);
  app.use(globalErrorHandler);

  return app;
};

module.exports = { createApp };
