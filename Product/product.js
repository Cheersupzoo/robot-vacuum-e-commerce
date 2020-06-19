const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const colors = require('colors');
const { v4: uuidv4 } = require('uuid');

const port = process.argv.slice(2)[0] || 8083;
const app = express();
app.use(bodyParser.json());

const hostname = 'http://localhost';

const smartness = {
    1: 'Low',
    2: 'Medium',
    3: 'Outstanding'
}

const products = [
    { product_id: 1, name: "Xiaomi Mijia", image_url: 'miro1.jpg', price: 7819.0, smartness: 3 },
    { product_id: 2, name: "AUTOBOT ROBOT VACUUM CLEANER MINI WHITE", image_url: 'robot-maker-robot-vacuum-cleaner-mini-white-1.jpg', price: 3900.0, smartness: 1 },
    { product_id: 3, name: "Xiaomi Robot 1C Vacuum Mop", image_url: '5dba546aNaa3b4992.jpg!q70.jpg', price: 5528.0, smartness: 2 }
];


app.get('/product', (req, res) => {
    // get list of Vacuums

    var response_product_list = [];

    for (product in products) {
        response_product_list.push({
            product_id: products[product].product_id,
            name: products[product].name
        });
    }

    const response = {
        status: 'successful',
        product_list: response_product_list
    }

    res.status(202).send(response);
    console.log(`[Product] get product list`.green);

});

app.get('/product/**', (req, res) => {
    // get Vacuum detail

    const product_id = parseInt(req.params[0]);
    const product = products.find(subject => subject.product_id === product_id);



    if (product) {
        const response = {
            product_id: product.product_id,
            name: product.name,
            image_url: `${hostname}:8083/img/${product.image_url}`, 
            price: product.price, 
            smartness: smartness[product.smartness]
        }

        res.status(202).send(response);
        console.log(`[Product] get product detail`.green);
    } else {
        const response = {
            status: 'failure',
            error: 'User not exist!'
        }
        res.status(406).send(response)
        console.log(`[Product] product not found`.red);
    }

});

app.use('/img', express.static(path.join(__dirname,'img')));


console.log(`Product service listening on port ${port}`);
app.listen(port);