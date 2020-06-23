const axios = require('axios');
const endpoints = require('../configs/endpoints');
const { v4: uuidv4 } = require('uuid');
const orders = require("../providers/orders");

async function summitPlacedOrder(uuid){
    try {
        const order = orders.getUserOrder(uuid);
        await axios.post(`${endpoints.userManagerService}/history`, {
            uuid: uuid,
            order: { "uuid": uuidv4(), "items": order.items }
        })
    } catch (error) {
        console.log(error)
        throw 'user manager service is down';
    }

}

module.exports = {
    summitPlacedOrder
}