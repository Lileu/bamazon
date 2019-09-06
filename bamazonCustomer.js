var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});


var productPurchased = [];

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which displays all of the items available for sale
function start() {
    connection.query('SELECT item_id, product_name, price FROM products', function (err, res) {
        if (err) throw err;
        // generate horizontal table with cli-table
        var table = new Table({
            head: ['Item #', 'Product name', 'Price'],
            style: {
                head: ['blue'],
                compact: false,
                colAligns: ['center'],
            }
        });
        console.log("Welcome to Bamazon! Have a browse of what's in stock...");
        console.log('----------------------------------------------------------------------------------------------------');
        for (var i = 0; i < res.length; i++) {
            // push data to table
            table
                .push([res[i].item_id, res[i].product_name, res[i].price])
        };
        console.log(table.toString());
        purchase();
    })
};

function purchase() {
    // reconnect to db
    connection.query('SELECT * FROM products', function (err, res) {
        // use the inquirer module to collect inputs from the user
        inquirer.prompt([{
                    name: 'product',
                    type: 'rawlist',
                    message: "Which item would you like to buy?",
                    choices: function (value) {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].product_name);
                        }
                        return choiceArray;
                    }
                },
                {
                    name: 'order_qty',
                    type: 'input',
                    message: "How many units of the product would you like?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            // parse the inputs to retrieve the 
            .then(function (answer) {
                for (var i = 0; i < res.length; i++) {
                    // match the selected product to an item in the products table
                    if (res[i].product_name == answer.product) {
                        // declare a variable for the order_item
                        var order = res[i];
                        //console.log(order);
                    }
                }
                var updatedStockQty = parseInt(order.stock_quantity) - parseInt(answer.order_qty);

                if (order.stock_quantity < parseInt(answer.order_qty)) {
                    console.log("Sorry, we have insufficient stock. Please revise your ");
                    console.log("");
                    purchase();
                } else {
                    connection.query('UPDATE products SET ? WHERE ?', [{
                        stock_quantity: updatedStockQty
                    }, {
                        item_id: order.item_id
                    }], function (err, res) {
                        console.log("Your order has been submitted successfully!");
                        var totalCost = (parseInt(answer.order_qty) * order.price).toFixed(2);
                        console.log("Your total purchase price is $" + totalCost);
                        console.log("");
                        continueShopping();

                    })
                }
            })
    })
}

function continueShopping() {
    inquirer.prompt({
        name: 'continue',
        type: 'list',
        message: "Would you like to continue shopping?",
        choices: ["Yes", "No"]
    }).then(function (answer) {
        if (answer.continue == "Yes") {
            purchase();
        } else {
            console.log("Thank you for shopping with us! Your order will arrive in 3-5 days.");
            console.log('----------------------------------------------------------------------------------------------------');
        }
    })
}