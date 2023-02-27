-- migrate:up
CREATE TABLE `room_styles` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(200) NOT NULL
);

-- migrate:down

DROP TABLE room_styles;
