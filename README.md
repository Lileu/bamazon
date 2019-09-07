# Bamazon
Week 12 homework assignment - Node.js &amp; MySQL

## Description
Amazon-like storefront app that takes in orders from customers and depletes stock from the store's inventory. The app also tracks product sales across the store's departments and then provides a summary of the highest-grossing departments in the store.

---
## Prerequisites
* node.js
* run 'npm install' to install required packages

---
## Outline
1. Products available for purchase will be displayed.
2. User will be prompted to select a product to purchase and number of units to be purchased.
3. The application will check the available inventory -
   a) if there is sufficient stock, the user will be shown the total cost and the database will be updated to reflect the reduction in stock.
   b) if there is insufficient stock, the user will be informed and asked to revise their order.
4. The user will be given the option to continue shopping or exit.

---
## Built with
* javascript
* node.js
* npm packages:
- [mysql](https://www.npmjs.com/package/mysql)
- [inquirer](https://www.npmjs.com/package/inquirer)
- [cli-table](https://www.npmjs.com/package/cli-table)
* MySQLWorkbench

---
## Demo video
