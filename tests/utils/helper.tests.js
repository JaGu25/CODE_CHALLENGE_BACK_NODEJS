const supertest = require("supertest");
const app = require('./test.server')

class Helper {
    constructor(model) {
        this.apiServer = supertest(app);
    }
}

module.exports = Helper;