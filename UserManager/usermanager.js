const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const colors = require('colors');
const { v4: uuidv4 } = require('uuid');

const port = process.argv.slice(2)[0] || 8082;
const app = express();
app.use(bodyParser.json());



const paymentMethod = {
    0: "none",
    1: "credit-card",
    2: "Paypal"
}

const users = [
    { 
        uuid: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', name: 'Keanu Reeves', address: '9799 S. Beechwood Lane Manchester Township, NJ 08759', payment_method: 1, 
        history: [{ uuid: '15a6ge2d-asfd-56dw-8b6d-ab8dfbbd4net', items: [{product_id:1,amount:2}],},{ uuid: 'asdfgh2d-asfd-56dw-8b6d-ab8dfb2346as', items: [{product_id:2,amount:1},{product_id:3,amount:1}],}]
    }
];

app.get('/profile', (req, res) => {
    // get user profile

    const user = users.find(user => user.uuid === req.body['uuid']);

    if (user) {
        const response = {
            status: 'successful',
            name: user.name,
            address: user.address,
            payment_method: paymentMethod[user.payment_method]
        }

        res.status(202).send(response);
        console.log(`[UserManager] get user profile`.green);
    } else {
        const response = {
            status: 'failure',
            error: 'User not exist!'
        }
        res.status(406).send(response)
        console.log(`[UserManager] user not found`.red);
    }

});

app.post('/profile', (req, res) => {
    // update user profile

    const user = users.find(user => user.uuid === req.body['uuid']);

    if (user) {
        for (let attribute in user) {
            if (req.body[attribute]) {
                user[attribute] = req.body[attribute];
                console.log(`Set ${attribute} to ${req.body[attribute]} in user: ${user.uuid}`);
            }
        }

        const response = {
            status: 'update successful',
            name: user.name,
            address: user.address,
            payment_method: paymentMethod[user.payment_method]
        }

        res.status(202).send(response);
        console.log(`[UserManager] Update user profile`.green);
    } else {
        const response = {
            status: 'failure',
            error: 'User not exist!'
        }
        res.status(406).send(response)
        console.log(`[UserManager] user not found`.red);
    }

});

app.get('/history', (req, res) => {
    // get a list of purchase history

    const user = users.find(user => user.uuid === req.body['uuid']);

    if (user) {
        const response = {
            status: 'successful',
            history: user.history,
        }

        res.status(202).send(response);
        console.log(`[UserManager] get user purchase history`.green);
    } else {
        const response = {
            status: 'failure',
            error: 'User not exist!'
        }
        res.status(406).send(response)
        console.log(`[UserManager] user not found`.red);
    }

});


app.post('/history', (req, res) => {
    // add newly purchased order

    const user = users.find(user => user.uuid === req.body['uuid']);

    if (user) {

        user.history.push(req.body['order']);

        const response = {
            status: 'successful add new order',
            history: user.history,
        }

        res.status(202).send(response);
        console.log(`[UserManager] Add new order`.green);
    } else {
        const response = {
            status: 'failure',
            error: 'User not exist!'
        }
        res.status(406).send(response)
        console.log(`[UserManager] user not found`.red);
    }

});

app.post('/adduser', (req, res) => {
    // add new user profile

    const user = users.find(user => user.uuid === req.body['uuid']);

    if (user) {
        // user already exist
        const response = {
            status: 'error: user already exist',
        }

        res.status(500).send(response);
        console.log(`[UserManager] User already exist`.red);
    } else {
        users.push({
            uuid: req.body['uuid'], name: req.body['name'], address: '', payment_method: 0, 
            history: [],}
        );
        const response = {
            status: 'successful'
        }
        res.status(202).send(response)
        console.log(`[UserManager] add new user profile`.green);
    }

});



console.log(`User Manager service listening on port ${port}`);
app.listen(port);