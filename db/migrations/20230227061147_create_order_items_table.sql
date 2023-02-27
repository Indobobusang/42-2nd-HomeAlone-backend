-- migrate:up
CREATE TABLE `order_items` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `quantity` INT NOT NULL,
  `product_id` INT NOT NULL,
  `order_id` INT NOT NULL,
  CONSTRAINT `order_item_product_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `order_item_order_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
);

-- migrate:down
DROP TABLE order_items;
