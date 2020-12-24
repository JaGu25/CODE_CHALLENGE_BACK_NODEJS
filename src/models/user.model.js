const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const Address = require('./address.model');

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

UserSchema.pre('deleteOne', { document: true }, function (next) {
    Address.remove({ id: this.address.id }).exec();
    next();
});


module.exports = mongoose.model('user', UserSchema);