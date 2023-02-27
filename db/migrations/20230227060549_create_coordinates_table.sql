-- migrate:up
CREATE TABLE `coordinates` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `pixel_row` INT NOT NULL,
  `pixel_column` INT NOT NULL,
  `post_image_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  CONSTRAINT `coordinate_post_image_fkey` FOREIGN KEY (`post_image_id`) REFERENCES `post_images` (`id`),
  CONSTRAINT `coordinate_product_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
);

-- migrate:down

DROP TABLE coordinates;
