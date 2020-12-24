const User = require("./../models/user.model");
const Address = require("./../models/address.model");

const repository = {

    createUser: async (user) => {
        let createdUser = new User(user);
        await createdUser.save();
        return createdUser;
    },

    createAddress: async (address) => {
        let createdAddress = new Address(address);
        await createdAddress.save();
        return createdAddress;
    },

    getUser: async (id) => {
        const user = await User.findOne({ id }).populate("address");
        return user;
    },

    addressExists: async (id) => {
        const address = await Address.findOne({ id });
        return address;
    }



}


module.exports = repository;