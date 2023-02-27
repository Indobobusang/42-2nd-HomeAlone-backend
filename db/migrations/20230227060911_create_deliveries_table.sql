-- migrate:up
CREATE TABLE `deliveries` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `receiver` VARCHAR(200) NOT NULL,
  `phone_number` VARCHAR(100) NOT NULL,
  `address` VARCHAR(200) NOT NULL,
  `detail_address` VARCHAR(200),
  `message` VARCHAR(200),
  `zip_code` VARCHAR(200),
  `name` VARCHAR(200),
  `user_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `delivery_user_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

-- migrate:down
DROP TABLE deliveries;

