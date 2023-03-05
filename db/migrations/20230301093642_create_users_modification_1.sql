-- migrate:up
ALTER TABLE users 
  MODIFY COLUMN password varchar(200);

-- migrate:down
ALTER TABLE users
  MODIFY COLUMN password varchar(200) NOT NULL;
