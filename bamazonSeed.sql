DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
item_id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR(45) NOT NULL,
department_name VARCHAR(45) NOT NULL,
price INTEGER NOT NULL,
stock_quantity INTEGER NOT NULL,
PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Keyboards", "Computers", 75, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wireless Mouse", "Computers", 15, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPad", "Electronics", 400, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Code Debugger", "Computers", 1000, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hot Wheels Car", "Toys", 3, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Video Games", 300, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bamazon Kindling", "E-Reader", 150, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Exotic Butters", "Food", 15, 430);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sweet New Ride", "Cars", 150000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Databases", "Computers", 500, 100);

SELECT*FROM products;