const express = require('express');
const router = express.Router();
const controller = require('./../controllers/user.controller');
const validate = require('../validators/user.validate');

router.get('/getUsers', controller.getUsers);
router.post('/createUsers', validate.createUser, controller.createUser);
router.get('/getUsersById/:userId', validate.idUser, controller.getUserById);
router.put('/updateUsersById/:userId', controller.getUsers);
router.delete('/deleteUsersById/:userId', controller.getUsers);


module.exports = router;