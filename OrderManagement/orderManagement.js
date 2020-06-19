const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const colors = require('colors');
const { v4: uuidv4 } = require('uuid');

const port = process.argv.slice(2)[0] || 8084;
const app = express();
app.use(bodyParser.json());

const userManagerService = 'http://localhost:8082';

const orders = [{ user_uuid: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', items: [{ product_id: 1, amount: 1 }] }];

app.get('/order', (req, res) => {
    // get list of order item

    const order = orders.find(user => user.user_uuid === req.body['uuid']);

    if (order) {

        const response = {
            status: 'successful',
            items: order.items
        }

        res.status(202).send(response);
        console.log(`[OrderManagement] get user order`.green);
    } else {
        const response = {
            status: 'failure',
            error: 'User not exist!'
        }
        res.status(406).send(response)
        console.log(`[OrderManagement] user not found`.red);
    }

});

app.post('/order/add', (req, res) => {
    // add item to list of order

    const order = orders.find(user => user.user_uuid === req.body['uuid']);

    if (order) {

        var item = order.items.find(item => item.product_id === req.body['product_id'])

        if (item) {
            // if item already exist add number of amount instead of push new item to list
            item.amount = item.amount + req.body['amount'];
        } else {
            order.items.push({ product_id: req.body['product_id'], amount: req.body['amount'] });
        }


        const response = {
            status: 'Add item successful',
            items: order.items
        }

        res.status(202).send(response);
        console.log(`[OrderManagement] Add item to order`.green);
    } else {
        const response = {
            status: 'failure',
            error: 'User not exist!'
        }
        res.status(406).send(response)
        console.log(`[OrderManagement] user not found`.red);
    }

});

app.post('/order/remove', (req, res) => {
    // remove item from list of order

    const user = orders.find(user => user.user_uuid === req.body['uuid']);

    if (user) {

        order = user.items.find(item => item.product_id === req.body['product_id']);

        if (order) {
            for (var i = user.items.length - 1; i >= 0; i--) {
                console.log(`loop ${i}`);
                if (user.items[i].product_id === req.body['product_id']) {
                    user.items.splice(i, 1);
                    break;
                }
            }

            const response = {
                status: 'Remove item successful',
                items: user.items
            }

            res.status(202).send(response);
            console.log(`[OrderManagement] get user order`.green);

        } else {
            const response = {
                status: 'Item not found'
            }

            res.status(404).send(response);
            console.log(`[OrderManagement] get user order`.green);
        }



        const response = {
            status: 'Remove item successful',
            items: user.items
        }


    } else {
        const response = {
            status: 'failure',
            error: 'User not exist!'
        }
        res.status(406).send(response)
        console.log(`[OrderManagement] user not found`.red);
    }

});

app.post('/order/placeorder', (req, res) => {
    // Place and paid the order => update user history

    const order = orders.find(user => user.user_uuid === req.body['uuid']);

    if (order) {

        if (order.items.length != 0) {

            axios.post(`${userManagerService}/history`, {
                uuid: req.body['uuid'],
                order: { "uuid": uuidv4(), "items": order.items}

            }).catch(error => {
                res.status(500).send({ status: 'error: something went wrong' });
                console.log(error)
            });

            // clear order list
            order.items = [];

            const response = {
                status: 'Place order successful'
            }

            res.status(202).send(response);
            console.log(`[OrderManagement] Place order`.green);
        } else {
            const response = {
                status: 'Order is empty'
            }
            res.status(406).send(response);
            console.log(`[OrderManagement] Order is empty`.green);
        }


    } else {
        const response = {
            status: 'failure',
            error: 'User not exist!'
        }
        res.status(406).send(response)
        console.log(`[OrderManagement] user not found`.red);
    }

});

app.post('/adduser', (req, res) => {
    // add new user current order management

    const user = orders.find(user => user.uuid === req.body['uuid']);

    if (user) {
        // user already exist
        const response = {
            status: 'error: user already exist',
        }

        res.status(500).send(response);
        console.log(`[UserManager] User already exist`.red);
    } else {
        orders.push({
            user_uuid: req.body['uuid'], items: []
        });
        const response = {
            status: 'successful'
        }
        res.status(202).send(response)
        console.log(`[UserManager] add new user current order management`.green);
    }

});





console.log(`Order Manager service listening on port ${port}`);
app.listen(port);