-- migrate:up
CREATE TABLE `products` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `discount` DECIMAL(10,2) NOT NULL DEFAULT 0,
  `image_url` VARCHAR(2000),
  `description` VARCHAR(1000),
  `shipping_fee` DECIMAL(10,2) NOT NULL,
  `sales_amount` INT DEFAULT 0,
  `category_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `product_category_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
);

-- migrate:down
DROP TABLE products;
