const colors = require('colors');
const paymentMethod = require('../models/paymentMethod');

const userProfileDatabase = [
    {
        uuid: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', name: 'Keanu Reeves', address: '9799 S. Beechwood Lane Manchester Township, NJ 08759', payment_method: 1,
        history: [{ uuid: '15a6ge2d-asfd-56dw-8b6d-ab8dfbbd4net', items: [{ product_id: 1, amount: 2 }], }, { uuid: 'asdfgh2d-asfd-56dw-8b6d-ab8dfb2346as', items: [{ product_id: 2, amount: 1 }, { product_id: 3, amount: 1 }], }]
    }
];

function authenticateByUserUUID(uuid) {
    const user = userProfileDatabase.find(user => user.uuid === uuid);
    if (user) return true;
    return false;
}

function getUserProfile(uuid) {
    const user = userProfileDatabase.find(user => user.uuid === uuid);
    return {
        status: 'successful',
        name: user.name,
        address: user.address,
        payment_method: paymentMethod[user.payment_method]
    }
}

function updateUserProfile(uuid, body) {
    const user = userProfileDatabase.find(user => user.uuid === uuid);

    for (let attribute in user) {
        if (body[attribute]) {
            user[attribute] = body[attribute];
            console.log(`Set ${attribute} to ${body[attribute]} in user: ${user.uuid}`);
        }
    }

    return {
        status: 'update successful',
        name: user.name,
        address: user.address,
        payment_method: paymentMethod[user.payment_method]
    }
}

function getUserHistory(uuid) {
    const user = userProfileDatabase.find(user => user.uuid === uuid);
    return {
        status: 'successful',
        history: user.history
    }
}

function addUserNewHistory(uuid, newHistory) {
    const user = userProfileDatabase.find(user => user.uuid === uuid);
    user.history.push(newHistory);

    return {
        status: 'successful add new order',
        history: user.history,
    }
}

function addNewUser(uuid,name) {
    userProfileDatabase.push({
        uuid: uuid, name: name, address: '', payment_method: 0, 
        history: [],}
    );

    return {
        status: 'successful'
    }
}

module.exports = {
    authenticateByUserUUID, getUserProfile, 
    updateUserProfile, getUserHistory, 
    addUserNewHistory, addNewUser
}