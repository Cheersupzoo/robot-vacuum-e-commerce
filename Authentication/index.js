const express = require('express');
const bodyParser = require('body-parser');

const port = process.argv.slice(2)[0] || 8081;
const app = express();

const login = require('./routes/login');
const registration = require('./routes/registration');

app.use(bodyParser.json());

// @route  POST /registration
app.use(registration);
// @route  POST /login
app.use(login);

console.log(`Authentication service listening on port ${port}`);
app.listen(port);