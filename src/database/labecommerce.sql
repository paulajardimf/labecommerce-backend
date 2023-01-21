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
WHERE price >= 10 AND price <= 30
ORDER BY price ASC;

-- Criação tabela de pedidos
CREATE TABLE purchases(
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  total_price REAL NOT NULL,
  paid INTEGER NOT NULL,
  delivered_at TEXT,
  buyer_id TEXT NOT NULL, 
  FOREIGN KEY (buyer_id) REFERENCES users(id) 
);

SELECT * FROM purchases;

INSERT INTO purchases(id, total_price, paid, buyer_id)
VALUES ("c001", 100, 0, "u002"),
       ("c002", 150, 0, "u002"),
       ("c003", 350, 0, "u003"),
       ("c004", 25, 0, "u003"),
       ("c005", 75, 0, "u004"),
       ("c006", 500, 0, "u004");

-- Editando status de pago e entregue
UPDATE purchases
SET delivered_at = DATETIME('now'), paid = 1
WHERE id = "c003";

-- Query de consulta com JOIN nas tabelas de users e purchases
SELECT 
users.id AS userId,
purchases.id AS purchasesId, 
purchases.total_price AS totalPrice, 
purchases.paid, 
purchases.delivered_at AS deliveredAt
FROM purchases
JOIN users ON purchases.buyer_id = users.id 
WHERE users.id = 'u002';

CREATE TABLE purchases_products(
  purchase_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL
);

SELECT * FROM purchases_products;

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES ("c001", "p003", 2),
       ("c002", "p003", 3),
       ("c003", "p003", 7);

--Consulta com junção INNER JOIN
SELECT purchases_products.*, purchases.*, products.*
FROM purchases_products
INNER JOIN purchases ON purchases_products.purchase_id = purchases.id
INNER JOIN products ON purchases_products.product_id = products.id;
