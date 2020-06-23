const hostname = require('../configs/endpoints').hostname;
const smartness = require('../models/smartness');

const productDatabase = [
    { product_id: 1, name: "Xiaomi Mijia", image_url: 'miro1.jpg', price: 7819.0, smartness: 3 },
    { product_id: 2, name: "AUTOBOT ROBOT VACUUM CLEANER MINI WHITE", image_url: 'robot-maker-robot-vacuum-cleaner-mini-white-1.jpg', price: 3900.0, smartness: 1 },
    { product_id: 3, name: "Xiaomi Robot 1C Vacuum Mop", image_url: '5dba546aNaa3b4992.jpg!q70.jpg', price: 5528.0, smartness: 2 }
];

function getProductList() {
    var response_product_list = [];

    for (product in productDatabase) {
        response_product_list.push({
            product_id: productDatabase[product].product_id,
            name: productDatabase[product].name
        });
    }

    return {
        status: 'successful',
        product_list: response_product_list
    };
}

function isProductExist(product_id) {
    const product = productDatabase.find(subject => subject.product_id === product_id);
    if (product) return true;
    return false;
}

function getProductDetail(product_id) {
    const product = productDatabase.find(subject => subject.product_id === product_id);
    return {
        product_id: product.product_id,
        name: product.name,
        image_url: `${hostname}:8083/img/${product.image_url}`, 
        price: product.price, 
        smartness: smartness[product.smartness]
    }
}

module.exports = {
    getProductList, isProductExist, getProductDetail
}