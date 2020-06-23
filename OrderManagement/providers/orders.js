const orderDatabase = [{ user_uuid: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', items: [{ product_id: 1, amount: 1 }] }];

function authenticateByUserUUID(uuid) {
    const user = orderDatabase.find(user => user.user_uuid === uuid);
    if (user) return true;
    return false;
}

function isUserExist(uuid) {
    const user = orderDatabase.find(user => user.user_uuid === uuid);
    if (user) return true;
    return false;
}

function addNewUser(uuid) {
    orderDatabase.push({
        user_uuid: uuid, items: []
    });

    return {
        status: 'successful'
    }
}

function getUserOrder(uuid) {
    const order = orderDatabase.find(user => user.user_uuid === uuid);
    return {
        status: 'successful',
        items: order.items
    }
}

function addProductToOrder(uuid, product_id, amount) {
    const order = orderDatabase.find(user => user.user_uuid === uuid);
    var item = order.items.find(item => item.product_id === product_id)

    if (item) {
        // if item already exist add number of amount instead of push new item to list
        item.amount = item.amount + amount;
    } else {
        order.items.push({ product_id: product_id, amount: amount });
    }

    return {
        status: 'Add item successful',
        items: order.items
    }
}

function isProductInOrder(uuid,product_id){
    const order = orderDatabase.find(user => user.user_uuid === uuid);
    const product = order.items.find(item => item.product_id === product_id);
    if(product) return true;
    return false;
}

function removeProductFromOrder(uuid, product_id) {
    const user = orderDatabase.find(user => user.user_uuid === uuid);

    for (var i = user.items.length - 1; i >= 0; i--) {
        if (user.items[i].product_id === product_id) {
            user.items.splice(i, 1);
            break;
        }
    }

    return {
        status: 'Remove item successful',
        items: user.items
    }
}

function isOrderEmpty(uuid) {
    const order = orderDatabase.find(user => user.user_uuid === uuid);
    if(order.items.length == 0) return true;
    return false;
}

function placeOrder(uuid) {
    const order = orderDatabase.find(user => user.user_uuid === uuid);
    // clear order list
    order.items = [];
    return {
        status: 'Place order successful'
    }
}

module.exports = {
    isUserExist, addNewUser,
    getUserOrder, authenticateByUserUUID,
    addProductToOrder, isProductInOrder,
    removeProductFromOrder , isOrderEmpty,
    placeOrder
}