-- migrate:up
CREATE TABLE `posts` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NOT NULL,
  `description` VARCHAR(3000),
  `user_id` INT NOT NULL,
  `room_style_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `post_user_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `post_room_style_fkey` FOREIGN KEY (`room_style_id`) REFERENCES `room_styles` (`id`)
);

-- migrate:down
DROP TABLE posts;

