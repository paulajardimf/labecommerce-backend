-- Active: 1674262100032@@127.0.0.1@3306
CREATE TABLE users(
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

INSERT INTO users (id, email, password)
VALUES ("u001", "paulajardimf@gmail.com", "paula123"),
("u002", "barbaramaral@gmail.com", "barbara123"),
("u003", "aline@gmail.com", "aline123");


CREATE TABLE products(
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES ("p001", "produto1", 9.90, "Acessórios"),
("p002", "produto2", 24.90, "Roupas e calçados"),
("p003", "produto3", 19.90, "Roupas e calçados"),
("p004", "produto4", 49.90, "Eletrônicos"),
("p005", "produto5", 14.90, "Acessórios");

-- Get All Products
SELECT * FROM users;

-- Get All Products
SELECT * FROM products;

-- Search Product by name
SELECT * FROM products WHERE name LIKE "%Produto3%";

-- Create User
INSERT INTO users(id, email, password)
VALUES("u004", "anaclara@gmail.com", "sal123");

-- Create Product
INSERT INTO products(id, name, price, category)
VALUES ("p006", "produto6", 34.90, "Roupas e calçados");

-- Get Products by id
SELECT * FROM products
WHERE id = "p002";

-- Delete User by id
DELETE FROM users
WHERE id = "u001";

-- Delete Product by id
DELETE FROM products
WHERE id = "p001";

-- Edit User by id
UPDATE users
SET password = "2345678"
WHERE id = "u003";

-- Edit Product by id
UPDATE products
SET price = 50
WHERE id = "p003";

-- Get All Users ORDER ASCENDENTE
SELECT * FROM users ORDER BY email ASC;

-- Get All Products ORDER PREÇO
SELECT * FROM products ORDER BY price ASC
LIMIT 20 OFFSET 1;

-- Get All Products FILTRO POR PREÇO ORDER ASCENDENTE
SELECT * FROM products
WHERE price >= 100 AND price <= 300
ORDER BY price ASC;