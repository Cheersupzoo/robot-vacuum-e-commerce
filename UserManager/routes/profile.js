const express = require("express");
const router = express.Router();
const userProfiles = require("../providers/userProfiles");

router.get('/profile', (req, res) => {
    // get user profile

    // extract req.body
    const uuid = req.body['uuid'];
    // get user profile
    const response = userProfiles.getUserProfile(uuid);
    res.status(202).send(response);
    console.log(`[UserManager] get user profile`.green);

});

router.post('/profile', (req, res) => {
    // update user profile

    // extract req.body
    const uuid = req.body['uuid'];
    // update user profile and then return updated user profile
    const response = userProfiles.updateUserProfile(uuid, req.body)
    res.status(202).send(response);
    console.log(`[UserManager] Update user profile`.green);

});

module.exports = router;