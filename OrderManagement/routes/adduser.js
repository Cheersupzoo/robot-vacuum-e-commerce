const express = require("express");
const router = express.Router();
const orders = require("../providers/orders");

router.post('/adduser', (req, res) => {
    // add new user current order management

    // extract req.body
    const uuid = req.body['uuid'];
    // check if user is exist
    const isUserExist = orders.isUserExist(uuid);

    if (isUserExist) {
        // user already exist
        const response = {
            status: 'error: user already exist',
        }
        res.status(500).send(response);
        console.log(`[UserManager] User already exist`.red);
    } else {
        // add new user and return status
        const response = orders.addNewUser(uuid);
        res.status(202).send(response)
        console.log(`[OrderManagement] add new user current order management`.green);
    }

});

module.exports = router;