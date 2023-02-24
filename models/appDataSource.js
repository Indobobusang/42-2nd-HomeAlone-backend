const { DataSource } = require("typeorm");

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Data server has been initiallized!!");
  })
  .catch((err) => {
    console.log("Failed to connect database", err);
  });

module.exports = {
  appDataSource,
};
