-- ### Challenge #1: Customer View (Minimum Requirement)

DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(40) NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL (10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Yoga Mat','Fitness',89.95,15),
    ('Shea Butter Handcream 15mg','Health and Beauty',14.99,35),
    ('Dog Collar','Pets',12.60,20),
    ('Electric Toothbrush','Electronics',119.00,20),
    ('Yoga Block','Fitness',16.50,12),
    ('Mechinical Keyboard','Electronics',103.77,22),
    ('Leather Compendium','Accessories',119.90,27),
    ('Plush Knitted Throw','Homewares',87.50,2),
    ('Set of 3 Scented Candles','Homewares',14.96,5),
    ('Wayfarer Sunglasses','Accessories',105.60,8);
-- 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).