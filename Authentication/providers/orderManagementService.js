const axios = require('axios');
const endpoints = require('../configs/endpoints');

async function addNewUser(newUUID){
    // notify orderManagementService to add new user
    
    try {
        await axios.post(`${endpoints.orderManagementService}/adduser`, {
            uuid: newUUID,
        });
    } catch (error) {
        console.log(error)
        throw "err: User Manager Services error"
    }
}

module.exports = {
    addNewUser
}