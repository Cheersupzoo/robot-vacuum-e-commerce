const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const colors = require('colors');

const port = process.argv.slice(2)[0] || 8083;
const app = express();

const product = require('./routes/product');

app.use(bodyParser.json());

// @route GET /product
// @route GET /product/** 
app.use(product);

// route for download image file
app.use('/img', express.static(path.join(__dirname,'img')));

console.log(`Product service listening on port ${port}`);
app.listen(port);