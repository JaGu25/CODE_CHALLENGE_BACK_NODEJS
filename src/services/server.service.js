const { PORT, APPLICATION_NAME } = require("./../config");
const router = require('./../routes');
const express = require('express');
const app = express();

const initializeServer = async () => {
    app.use(router);
    app.listen(7000, () => {
        console.log(`${APPLICATION_NAME} is running in ${PORT}`);
    });
    return app;
}

module.exports = initializeServer; 