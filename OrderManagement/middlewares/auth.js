const express = require("express");
const router = express.Router();
const orders = require("../providers/orders");

router.use((req, res, next) => {
    // middleware check if uuid is valid

    // extract req.body
    const uuid = req.body['uuid'];
    // check if UUID is valid
    const isValidUUID = orders.authenticateByUserUUID(uuid);

    if(isValidUUID) next();
    else {
        console.log(`[UserManager] User Not existed`.red);
        const response = {
            status: 'failure',
            error: 'User not exist!'
        }
        res.status(406).send(response);
    }
})

module.exports = router;