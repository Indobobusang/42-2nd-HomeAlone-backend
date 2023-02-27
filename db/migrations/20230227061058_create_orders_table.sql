-- migrate:up
CREATE TABLE `orders` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `order_number` VARCHAR(200) NOT NULL,
  `total_price` DECIMAL(10,2) NOT NULL,
  `delivery_price` DECIMAL(10,2) NOT NULL,
  `delivery_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `payment_method_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `order_payment_method_fkey` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`id`),
  CONSTRAINT `order_user_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `order_delivery_fkey` FOREIGN KEY (`delivery_id`) REFERENCES `deliveries` (`id`)
);


-- migrate:down

DROP TABLE orders;
