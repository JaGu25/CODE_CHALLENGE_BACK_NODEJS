const express = require("express");
const userRoutes = require("./user.routes");
const cors = require("cors");
const notFoundMiddleware = require("../middlewares/not-found.middleware");
const router = express.Router()
const apiRoutes = express.Router();
const swaggerUI = require('swagger-ui-express');
const { SWAGGER_PATH_DEV } = require('./../config');

apiRoutes
    .use(cors())
    .use(express.json());

    
apiRoutes.use("/users", userRoutes);

router.use("/v1/api", apiRoutes);

router.use("/v1/api/swagger",swaggerUI.serve,swaggerUI.setup(SWAGGER_PATH_DEV));

router.use(notFoundMiddleware);

module.exports = router