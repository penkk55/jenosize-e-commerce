CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO products (id, name, price, created_at, updated_at)
VALUES
  (uuid_generate_v4(), 'Product 1', 100.00, NOW(), NOW()),
  (uuid_generate_v4(), 'Product 2', 200.00, NOW(), NOW()),
  (uuid_generate_v4(), 'Product 3', 300.00, NOW(), NOW()),
   (uuid_generate_v4(), 'Product 4', 400.00, NOW(), NOW()),
  (uuid_generate_v4(), 'Product 5', 500.00, NOW(), NOW()),
   (uuid_generate_v4(), 'Product 6', 600.00, NOW(), NOW()),
  (uuid_generate_v4(), 'Product 7', 700.00, NOW(), NOW()),
   (uuid_generate_v4(), 'Product 8', 800.00, NOW(), NOW()),
  (uuid_generate_v4(), 'Product 9', 900.00, NOW(), NOW()),
  (uuid_generate_v4(), 'Product 10', 1000.00, NOW(), NOW());

INSERT INTO stocks (id, product_id, code, quantity, status, created_at, updated_at)
VALUES
  (uuid_generate_v4(), (SELECT id FROM products WHERE name = 'Product 1' LIMIT 1), 'CODE123', 50, 'IN_STOCK', NOW(), NOW()),
  (uuid_generate_v4(), (SELECT id FROM products WHERE name = 'Product 2' LIMIT 1), 'CODE124', 30, 'IN_STOCK', NOW(), NOW()),
  (uuid_generate_v4(), (SELECT id FROM products WHERE name = 'Product 3' LIMIT 1), 'CODE125', 20, 'RESERVED', NOW(), NOW());
  
INSERT INTO customers (id, name, password, email, balance, created_at, updated_at)
VALUES
  (uuid_generate_v4(), 'Customer 1','$2b$10$Kw62ecdii96WfidhWC9jPunVni40l9ux5KjfIMpwKRb08F4/bCcrG', 'customer1@example.com', 500.00, NOW(), NOW()),
  (uuid_generate_v4(), 'Customer 2', '$2b$10$Kw62ecdii96WfidhWC9jPunVni40l9ux5KjfIMpwKRb08F4/bCcrG', 'customer2@example.com', 1000.00, NOW(), NOW()),
  (uuid_generate_v4(), 'Customer 3', '$2b$10$Kw62ecdii96WfidhWC9jPunVni40l9ux5KjfIMpwKRb08F4/bCcrG', 'customer3@example.com', 200.00, NOW(), NOW()),
  (uuid_generate_v4(), 'Penknaja', '$2b$10$Kw62ecdii96WfidhWC9jPunVni40l9ux5KjfIMpwKRb08F4/bCcrG', 'penkk55@gmail.com', 1000, NOW(), NOW());
