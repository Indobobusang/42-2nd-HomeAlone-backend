-- migrate:up
CREATE TABLE `reviews` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(3000) NOT NULL,
  `image_url` VARCHAR(2000) NOT NULL,
  `rating` INT NOT NULL,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `review_user_product_ukey` UNIQUE KEY (`user_id`, `product_id`),
  CONSTRAINT `review_product_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `review_user_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

-- migrate:down

DROP TABLE reviews;
