const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const colors = require('colors');


const port = process.argv.slice(2)[0] || 8084;
const app = express();

const orders = require('./routes/order');
const adduser = require('./routes/adduser');

const auth = require('./middlewares/auth');

app.use(bodyParser.json());

app.use(adduser);

// middleware : check if uuid exist
app.use(auth);
// below 'route' will not run if req fail auth middleware

app.use('/order',orders);


console.log(`Order Manager service listening on port ${port}`);
app.listen(port);