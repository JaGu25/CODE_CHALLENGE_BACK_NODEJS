const { PORT, APPLICATION_NAME } = require("./../../src/config");
const router = require('./../../src/routes');
const express = require('express');
const initializeDatabase = require("../../src/services/database.service");
const app = express();


app.use(router);
app.listen(PORT, () => {});

initializeDatabase();

module.exports = app; 