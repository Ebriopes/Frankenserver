require('dotenv').config();
/** Import node modules */
const express = require('express');

/** Import custom modules */
const { PORT } = require('./config/config');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

app.use(middleware);
app.use(routes);

module.exports = { app, PORT };
