const express = require("express");
const router = express.Router();
const users = require("../providers/users");

router.post('/login', (req, res) => {

    const username = req.body['username'];
    const password = req.body['password']

    const uuid = users.getUserUUID(username, password);

    console.log(uuid)

    if (uuid) {
        const response = {
            status: 'success',
            uuid: uuid
        }
        res.status(202).send(response);
        console.log(`[Auth] user ${uuid} login`.green);
    } else {
        const response = {
            status: 'failure',
            error: 'Username or password incorrect!'
        }
        res.status(404).send(response);
        console.log(`[Auth] username already used`.red);
    }

});

module.exports = router;