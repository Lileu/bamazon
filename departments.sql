-- ### Challenge #3: Supervisor View (Final Level)

-- 1. Create a new MySQL table called `departments`. Your table should include the following columns:

--    * department_id

--    * department_name

--    * over_head_costs (A dummy number you set for each department)

-- 2. Modify the products table so that there's a product_sales column, and modify your `bamazonCustomer.js` app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

--    * Make sure your app still updates the inventory listed in the `products` column.
 DROP DATABASE IF EXISTS bamazon_db;

 CREATE DATABASE bamazon_db;

 USE bamazon_db;

 CREATE TABLE departments (
     department_id INT NOT NULL AUTO_INCREMENT,
     department_name VARCHAR(40),
     over_head_costs INT,
     PRIMARY KEY (department_id)
 )