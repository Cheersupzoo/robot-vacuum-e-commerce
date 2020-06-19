const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const colors = require('colors');
const { v4: uuidv4 } = require('uuid');

const port = process.argv.slice(2)[0] || 8081;
const app = express();
app.use(bodyParser.json());

const users = [
    { uuid: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', username: 'dev', password: '1234' }
]

app.post('/registration', (req, res) => {

    const alreadyUsed = users.find(user => user.username === req.body['username']);

    if (!alreadyUsed) {
        users.push({
            uuid: uuidv4(),
            username: req.body['username'],
            password: req.body['password']
        })

        res.status(202).send({status:'User created successful!'});
        console.log(`[Auth] user created`.green);
    } else {
        res.status(406).send({status:'Username already used!'})
        console.log(`[Auth] username already used`.red);
    }

});

app.post('/login', (req, res) => {

    const user = users.find(user => user.username === req.body['username'] && user.password === req.body['password']);

    if (user) {
        const response = {
            status: 'success',
            uuid: user.uuid
        }
        res.status(202).send(response);
        console.log(`[Auth] user login`.green);
    } else {
        const response = {
            status: 'failure',
            error: 'Username or password incorrect!'
        }
        res.status(404).send(response);
        console.log(`[Auth] username already used`.red);
    }

});

console.log(`Heroes service listening on port ${port}`);
app.listen(port);