-- migrate:up
CREATE TABLE `post_images` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `image_url` VARCHAR(2000) NOT NULL,
  `post_id` INT NOT NULL,
  CONSTRAINT `post_image_post_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
);

-- migrate:down

DROP TABLE post_images;
