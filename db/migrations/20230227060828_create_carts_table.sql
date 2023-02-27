-- migrate:up
CREATE TABLE `carts` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `cart_user_product_ukey` UNIQUE KEY (`user_id`, `product_id`),
  CONSTRAINT `cart_product_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `cart_user_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

-- migrate:down

DROP TABLE carts;
