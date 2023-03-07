-- migrate:up
ALTER TABLE carts
ADD COLUMN is_selected BOOLEAN NOT NULL DEFAULT TRUE AFTER quantity;

-- migrate:down
ALTER TABLE carts
DROP COLUMN is_selected;