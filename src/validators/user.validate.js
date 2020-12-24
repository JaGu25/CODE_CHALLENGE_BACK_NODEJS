const { check, param } = require('express-validator');

const validate = {

    createUser: [
        check('id', "Id is required").isNumeric().isInt().withMessage('Id must be a Int.'),
        check('name', 'the name is required').not().isEmpty(),
        check('birthDate', 'the birthDate is required and must be a Date (yyyy/mm/dd)').not().isEmpty().isDate(),
        check('email', 'the mail must be valid').isEmail(),
        check('address.id').isNumeric().isInt().withMessage('Id must be a Int.'),
        check('address.street', "street is required").not().isEmpty(),
        check('address.state', "state is required").not().isEmpty(),
        check('address.city', "city is required").not().isEmpty(),
        check('address.country', "country is required").not().isEmpty(),
        check('address.zip', "zip is required").not().isEmpty(),
    ],

    idUser: [
        param('userId').not().isEmpty().toInt(),
    ]
}

module.exports = validate;