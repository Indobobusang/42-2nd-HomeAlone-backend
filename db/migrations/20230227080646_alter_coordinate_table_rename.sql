-- migrate:up
ALTER TABLE coordinates RENAME image_coordinates;

-- migrate:down
ALTER TABLE image_coordinates RENAME coordinates;

