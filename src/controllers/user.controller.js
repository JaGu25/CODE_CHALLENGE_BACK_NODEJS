const { validationResult } = require('express-validator');
const httpStatusCodes = require('http-status-codes');
const responseResult = require('../helpers/response.helper');
const userService = require('./../services/user.service');

const controller = {

    createUser: async (req, res) => {
        const errors = validationResult(req);
        try {
            if (!errors.isEmpty()) {
                return responseResult.error(res, httpStatusCodes.METHOD_NOT_ALLOWED, 'Invalid input', errors);
            }

            let user = await userService.createUser(req.body);
            const response = { user };
            return responseResult.general(res, httpStatusCodes.CREATED, response, 'CREATED')
        } catch (error) {
            if (error.message == 'A user with that ID already exists.' || error.message == 'A address with that ID already exists.') {
                return responseResult.error(res, httpStatusCodes.BAD_REQUEST, error.message, error);
            }
            return responseResult.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error', error);
        }
    },

    getUsers: async (req, res) => {
        try {

            let users = await userService.getUsers();
            return responseResult.general(res, httpStatusCodes.OK, users, 'OK')

        } catch (error) {
            return responseResult.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error', error);
        }
    },

    getUserById: async (req, res) => {

        try {

            const { userId } = req.params;

            if (isNaN(userId)) return responseResult.error(res, httpStatusCodes.BAD_REQUEST, 'Invalid user id', []);

            let user = await userService.getUserById(userId);

            return responseResult.general(res, httpStatusCodes.OK, user, 'OK')

        } catch (error) {
            if (error.message == 'User does not exists.') {
                return responseResult.error(res, httpStatusCodes.NOT_FOUND, error.message, error);
            }
            return responseResult.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error', error);
        }
    },

    updateUserById: async (req, res) => {

        const errors = validationResult(req);

        try {

            if (!errors.isEmpty()) {
                return responseResult.error(res, httpStatusCodes.METHOD_NOT_ALLOWED, 'Invalid input', errors);
            }

            const { userId } = req.params;

            if (isNaN(userId)) return responseResult.error(res, httpStatusCodes.BAD_REQUEST, 'Invalid user id', []);

            const user = await userService.updateUser(req.body, userId);

            return responseResult.general(res, httpStatusCodes.OK, { user }, 'OK')

        } catch (error) {
            if (error.message == 'User does not exists.') {
                return responseResult.error(res, httpStatusCodes.NOT_FOUND, error.message, error);
            }
            if (error.message == 'A user with that ID already exists.' || error.message == 'A address with that ID already exists.') {
                return responseResult.error(res, httpStatusCodes.BAD_REQUEST, error.message, error);
            }
            return responseResult.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error', error);
        }

    },

    deleteUsersById: async (req, res) => {

        try {

            const { userId } = req.params;

            if (isNaN(userId)) return responseResult.error(res, httpStatusCodes.BAD_REQUEST, 'Invalid user id', []);

            await userService.deleteUserById(userId);

            return responseResult.general(res, httpStatusCodes.OK, [], 'OK User Deleted')

        } catch (error) {
            if (error.message == 'User does not exists.') {
                return responseResult.error(res, httpStatusCodes.NOT_FOUND, error.message, error);
            }
            return responseResult.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error', error);
        }

    }


}

module.exports = controller;