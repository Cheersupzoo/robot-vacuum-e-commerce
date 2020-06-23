const express = require("express");
const router = express.Router();
const orders = require("../providers/orders");
const userManagerService = require('../providers/userManagerService');

router.get('/', (req, res) => {
    // get list of order item

    // extract req.body
    const uuid = req.body['uuid'];

    const response = orders.getUserOrder(uuid);
    res.status(202).send(response);
    console.log(`[OrderManagement] get user order`.green);

});

router.post('/add', (req, res) => {
    // add item to list of order

    // extract req.body
    const uuid = req.body['uuid'];
    const product_id = req.body['product_id'];
    const amount = req.body['amount'];

    const response = orders.addProductToOrder(uuid, product_id, amount);
    res.status(202).send(response);
    console.log(`[OrderManagement] Add item to order`.green);

});

router.post('/remove', (req, res) => {
    // remove item from list of order

    // extract req.body
    const uuid = req.body['uuid'];
    const product_id = req.body['product_id'];

    const isProductInOrder = orders.isProductInOrder(uuid, product_id)
    if (isProductInOrder) {
        const response = orders.removeProductFromOrder(uuid, product_id)
        res.status(202).send(response);
        console.log(`[OrderManagement] remove product from order`.green);
    } else {
        const response = {
            status: 'Item not found'
        }
        res.status(404).send(response);
        console.log(`[OrderManagement] item not found`.red);
    }

});

router.post('/placeorder', async (req, res) => {
    // Place and paid the order => update user history

    // extract req.body
    const uuid = req.body['uuid'];
    // check if order is empty
    const isOrderEmpty = orders.isOrderEmpty(uuid);

    if (!isOrderEmpty) {
        try {
            // check first if order can be sent to userManagerService
            await userManagerService.summitPlacedOrder(uuid);
            // clear order list
            const response = orders.placeOrder(uuid);
            res.status(202).send(response);
            console.log(`[OrderManagement] Place order`.green);
        } catch (error) {
            res.status(500).send({ status: 'error: something went wrong' });
            console.log(error);
        }
    } else {
        const response = {
            status: 'Order is empty'
        }
        res.status(406).send(response);
        console.log(`[OrderManagement] Order is empty`.green);
    }

});

module.exports = router;