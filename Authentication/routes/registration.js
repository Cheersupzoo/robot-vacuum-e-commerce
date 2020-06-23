const express = require("express");
const router = express.Router();
const colors = require('colors');
const users = require("../providers/users");

const userManagerService = require('../providers/userManagerService');
const orderManagementService = require('../providers/orderManagementService');

router.post('/registration', async (req, res) => {
    const username = req.body['username'];

    const usernameExisted = users.checkUsernameExists(username);

    if (usernameExisted) {
        res.status(406).send({ status: 'Username already used!' });
        console.log(`[Auth] username already used`.red);
    } else {
        // extract req.body
        const username = req.body['username'];
        const password = req.body['password'];
        const name = req.body['name'];

        // add new user to user auth database
        const newUUID = users.addNewUser(username, password);

        // notify other services of new user
        try {
            await userManagerService.addNewUser(newUUID, name);
            await orderManagementService.addNewUser(newUUID);

            // res successful
            res.status(202).send({ status: 'User created successful!' });
            console.log(`[Auth] user created`.green);
        } catch (error) {
            console.log(error);
            res.status(500).send({ status: 'error: something went wrong' });
        }

    }

});

module.exports = router;