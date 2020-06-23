const express = require("express");
const router = express.Router();
const userProfiles = require("../providers/userProfiles");

router.post('/adduser', (req, res) => {
    // add new user profile

    // extract req.body
    const uuid = req.body['uuid'];
    // check if UUID is valid
    const isValidUUID = userProfiles.authenticateByUserUUID(uuid);

    if (isValidUUID) {
        // user already exist
        const response = {
            status: 'error: user already exist',
        }
        res.status(500).send(response);
        console.log(`[UserManager] User already exist`.red);
    } else {
        // extract req.body
        const name = req.body['name']
        // add new user and return status
        const response = userProfiles.addNewUser(uuid,name)
        res.status(202).send(response)
        console.log(`[UserManager] add new user profile`.green);
    }
});

module.exports = router;