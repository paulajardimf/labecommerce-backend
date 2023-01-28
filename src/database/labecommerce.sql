-- Active: 1674262100032@@127.0.0.1@3306
CREATE TABLE users(
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TEXT DEFAULT(DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password)
VALUES ("u001", "Paula", "paulajardimf@gmail.com", "paula123"),
("u002", "Bárbara","barbaramaral@gmail.com", "barbara123"),
("u003", "Aline", "aline@gmail.com", "aline123");


CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL
);  

INSERT INTO products (id, name, price, description,category, image_url)
VALUES 
("p001", "produto1", 9.90, "Acessório legal","Acessórios", "https://http2.mlstatic.com/D_NQ_NP_957367-MLB44536019148_012021-O.webp"),
("p002", "produto2", 24.90, "Roupa legal", "Roupas e calçados", "https://http2.mlstatic.com/D_NQ_NP_957367-MLB44536019148_012021-O.webp"),
("p003", "produto3", 19.90, "Calçado legal", "Roupas e calçados", "https://http2.mlstatic.com/D_NQ_NP_957367-MLB44536019148_012021-O.webp"),
("p004", "produto4", 49.90, "Eletrônico legal", "Eletrônicos", "https://http2.mlstatic.com/D_NQ_NP_957367-MLB44536019148_012021-O.webp"),
("p005", "produto5", 14.90, "Acessório legal", "Acessórios", "https://http2.mlstatic.com/D_NQ_NP_957367-MLB44536019148_012021-O.webp");

-- Get All Products
SELECT * FROM users;

-- Get All Products
SELECT * FROM products;

-- Search Product by name
SELECT * FROM products WHERE name LIKE "%Produto3%";

-- Create User
INSERT INTO users(id, name, email, password)
VALUES("u004", "Ana Clara","anaclara@gmail.com", "sal123");

-- Create Product
INSERT INTO products(id, name, price, description, category, image_url)
VALUES ("p006", "produto6", 34.90, "Roupa legal", "Roupas e calçados", "https://http2.mlstatic.com/D_NQ_NP_957367-MLB44536019148_012021-O.webp");

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
CREATE TABLE purchases (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  buyer TEXT NOT NULL,
  total_price REAL NOT NULL,
  created_at TEXT DEFAULT(DATETIME()) NOT NULL,
  paid INTEGER NOT NULL,
  FOREIGN KEY (buyer) REFERENCES users(id)
);

SELECT * FROM purchases;

INSERT INTO purchases(id, buyer, total_price, paid)
VALUES ("c001", "u002", 100, 0),
       ("c002", "u002", 150, 0),
       ("c003", "u003", 350, 0),
       ("c004", "u003", 25, 0),
       ("c005", "u004", 75, 0),
       ("c006", "u004", 500, 0);

-- Editando status de pago e entregue
UPDATE purchases
SET paid = 1, created_at = DATETIME('now')
WHERE id = "c001";
UPDATE purchases
SET paid = 1, created_at = DATETIME('now')
WHERE id = "c002";
UPDATE purchases
SET paid = 1, created_at = DATETIME('now')
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
  quantity INTEGER NOT NULL,
  FOREIGN KEY (purchase_id) REFERENCES purchases(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
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
