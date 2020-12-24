const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserSchema = mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    birthDate: {
        type: String,
        require: true
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'address'
    }
});


module.exports = mongoose.model('user', UserSchema);