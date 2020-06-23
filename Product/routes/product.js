const express = require("express");
const router = express.Router();
const products = require("../providers/products");

router.get('/product', (req, res) => {
    // get list of Vacuums

    // get product list from database
    const response = products.getProductList();
    res.status(202).send(response);
    console.log(`[Product] get product list`.green);

});

router.get('/product/**', (req, res) => {
    // get Vacuum detail

    // extract param from req.params
    const product_id = parseInt(req.params[0]);
    // check if product is exist
    const isProductExist = products.isProductExist(product_id);

    if (isProductExist) {
        // send product id and receive product detail response
        const response = products.getProductDetail(product_id);
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

module.exports = router;