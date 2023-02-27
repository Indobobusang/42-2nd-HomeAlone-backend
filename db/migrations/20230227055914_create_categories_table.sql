-- migrate:up
CREATE TABLE `categories` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200)
);

-- migrate:down
DROP TABLE categories;