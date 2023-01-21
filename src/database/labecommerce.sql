-- Active: 1674262100032@@127.0.0.1@3306
CREATE TABLE users(
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

SELECT * FROM users;

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

SELECT * FROM products;

INSERT INTO products (id, name, price, category)
VALUES ("p001", "produto1", 9.90, "Acessórios"),
("p002", "produto2", 24.90, "Roupas e calçados"),
("p003", "produto3", 19.90, "Roupas e calçados"),
("p004", "produto4", 49.90, "Eletrônicos"),
("p005", "produto5", 14.90, "Acessórios");