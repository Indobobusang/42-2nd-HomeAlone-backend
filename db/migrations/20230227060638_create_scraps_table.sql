-- migrate:up
CREATE TABLE `scraps` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `scrap_user_post_ukey` UNIQUE KEY (`user_id`, `post_id`),
  CONSTRAINT `scrap_user_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `scrap_post_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
);

-- migrate:down

DROP TABLE scraps;
