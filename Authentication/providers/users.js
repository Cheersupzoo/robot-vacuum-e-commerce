const { v4: uuidv4 } = require('uuid');

const  userDatabase = [
    { uuid: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', username: 'dev', password: '1234' }
]


function getUserDetail(username) {
    return userDatabase.find(user => user.username === username);
}

function checkUsernameExists(username) {
    const user = userDatabase.find(user => user.username === username);
    if (user) {
        return true;
    }
    return false;
}

function addNewUser(username, password) {
    const newUUID = uuidv4();
    userDatabase.push({
        uuid: newUUID,
        username: username,
        password: password
    })
    return newUUID;
}

function getUserUUID(username, password) {
    const user = userDatabase.find(user => user.username === username && user.password === password);
    if(user) return user.uuid;
}

module.exports = {
    getUserDetail, addNewUser, getUserUUID, checkUsernameExists
};