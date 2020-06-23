const express = require("express");
const router = express.Router();
const userProfiles = require("../providers/userProfiles");

router.get('/history', (req, res) => {
    // get a list of purchase history

    // extract req.body
    const uuid = req.body['uuid'];
    // get user history order
    const response = userProfiles.getUserHistory(uuid);
    res.status(202).send(response);
    console.log(`[UserManager] get user purchase history`.green);

});


router.post('/history', (req, res) => {
    // add newly purchased order

    // extract req.body
    const uuid = req.body['uuid'];
    const order = req.body['order'];
    // add user new history and then return updated history
    const response = userProfiles.addUserNewHistory(uuid, order);
    res.status(202).send(response);
    console.log(`[UserManager] Add new order`.green);

});

module.exports = router;