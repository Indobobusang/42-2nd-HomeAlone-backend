-- migrate:up
CREATE TABLE `payment_methods` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(200) NOT NULL
);

-- migrate:down
DROP TABLE payment_methods;

