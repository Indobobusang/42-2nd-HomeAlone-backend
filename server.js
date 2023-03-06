require("dotenv").config();
const { appDataSource } = require("./models/appDataSource");

const { createApp } = require("./app");
const { appDataSource } = require("./models/appDataSource");

const app = createApp();

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

const startServer = async () => {
  const PORT = process.env.PORT;

  await appDataSource
    .initialize()
    .then(() => {
      console.log("Data server has been initiallized!!");
    })
    .catch((err) => {
      console.log("Failed to connect database", err);
    });

  app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
  });
};

startServer();
