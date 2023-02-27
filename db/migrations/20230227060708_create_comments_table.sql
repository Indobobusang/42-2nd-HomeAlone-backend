-- migrate:up
CREATE TABLE `comments` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(3000) NOT NULL,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  `comment_id` INT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `comment_post_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `comment_user_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);


-- migrate:down

DROP TABLE comments;
