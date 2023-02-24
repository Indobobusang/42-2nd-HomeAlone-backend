require("dotenv").config();

const { createApp } = require("./app");

const app = createApp();

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

const startServer = async () => {
  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
  });
};

startServer();
