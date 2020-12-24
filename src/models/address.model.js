const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    street: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    zip: {
        type: String,
        require: true
    }
});


module.exports = mongoose.model('address', AddressSchema);