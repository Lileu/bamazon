var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Steven89',
    database: 'bamazon'
});


var productPurchased = [];

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which  displaya all of the items available for sale. Include the ids, names, and prices of products for sale.
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
            console.log("Welcome to Bamazon! Have a browse of what's in stock:"); console.log('----------------------------------------------------------------------------------------------------');
            for (var i = 0; i < res.length; i++) {
            // push data to table
            table
                .push([res[i].item_id, res[i].product_name, res[i].price]
            )
        };
        console.log(table.toString());
        purchase();
    })
};

function purchase = (){
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'id'
            message: "What is the ID of the product you would like to buy?",
            validate: function(value) {
                if (isNaN (value) === false) {
                    return true;
                }
                return false;
            }
        },

        {
            type: 'input',
            name: 'order_qty'
            message: "How many units of the product would you like?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
        .then(function(answer) {
            var item = answer.id;
            var order_qty = parseInt(answer.order_qty);
            var totalCost = parseFloat(((res[item].price)*order_qty);

            connection.query('SELECT * FROM products WHERE ?', { item_id: id },
                function(err, res) {
                    if (err) throw err;
                    console.log("Please enter a valid Item #");
                    start();
                    } if(res[0].stock_quantity < order_qty) {
                        console.log("Unfortunately we are out of stock of that item!"")
                        start();

                    }

                    }
            }
        }



            )
}


    //    * The first should ask them the ID of the product they would like to buy.
    //    * The second message should ask how many units of the product they would like to buy.

    // 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

    //    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

    // 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
    //    * This means updating the SQL database to reflect the remaining quantity.
    //    * Once the update goes through, show the customer the total cost of their purchase.