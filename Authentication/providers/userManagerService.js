const axios = require('axios');
const endpoints = require('../configs/endpoints');

async function addNewUser(newUUID,name){
    // notify userManagerService to add new user

    try {
        await axios.post(`${endpoints.userManagerService}/adduser`, {
            uuid: newUUID,
            name: name,
    
        });
    } catch (error) {
        console.log(error);
        throw "err: User Manager Services error"
    }

}

module.exports = {
    addNewUser
}