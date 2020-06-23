const express = require('express');
const bodyParser = require('body-parser');
const colors = require('colors');

const port = process.argv.slice(2)[0] || 8082;
const app = express();

const profile = require('./routes/profile');
const history = require('./routes/history');
const adduser = require('./routes/adduser');

const auth = require('./middlewares/auth');

app.use(bodyParser.json());

// @route  /adduser
app.use(adduser);

// middleware : check if uuid exist
app.use(auth);
// below 'route' will not run if req fail auth middleware

// @route  /profile
app.use(profile);
// @route  /history
app.use(history);

console.log(`User Manager service listening on port ${port}`);
app.listen(port);