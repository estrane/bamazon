// Beginning requirements
var mysql = require("mysql");
var inquirer = require("inquirer");

// Connection to the mysql Database being used.
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    startUp();
});

function purchaseItem() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the Item ID of the product you wish to purchase",
            name: "item",
            filter: Number
        },

        {
            type: "input",
            name: "quantity",
            message: "How many would you like to purchase?",
            filter: Number
        }
    ]).then(function (res) {
        var item = res.item;
        var quan = res.quantity;

        connection.query("SELECT * FROM products WHERE ?", { item_id: item }, function (err, response) {
            if (err) throw err;

            if (response.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                startUp();
            } else {
                var productData = response[0];

                // console.log('productData = ' + JSON.stringify(productData));
                // console.log('productData.stock_quantity = ' + productData.stock_quantity);

                // If the quantity requested by the user is in stock
                if (quan <= productData.stock_quantity) {
                    console.log('Congratulations, the product you requested is in stock! Placing order!');

                    // Construct the updating query string
                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quan) + ' WHERE item_id = ' + item;
                    // console.log('updateQueryStr = ' + updateQueryStr);

                    // Update the inventory
                    connection.query(updateQueryStr, function (err, data) {
                        if (err) throw err;

                        console.log('Your oder has been placed! Your total is $' + productData.price * quan);
                        console.log('Thank you for shopping with us!');
                        console.log("---------------------------------------------------------------------\n");

                        shopAgain();
                    })
                } else {
                    console.log("We're sorry, there is insuffient stock to place your order.\n" +
                        "Please modify your order or choose a different product.\n" + 
                        "Your item was " + productData.product_name + " and it has " + productData.stock_quantity + " left in stock.");
                        shopAgain();
                }
            }
        })
    })
}

function startUp() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + " | Name: " + res[i].product_name + " | Price: $" + res[i].price);
        }
        console.log("-----------------------------------");
        purchaseItem();
    });
}

function shopAgain() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to shop with us again?",
            name: "confirm"
        }
    ]).then(function (res) {
        if (res.confirm) {
            console.log("-----------------------------------");
            startUp();
        } else {
            console.log("Thank you for shopping Bamazon!");
            connection.end();
        }
    })
}