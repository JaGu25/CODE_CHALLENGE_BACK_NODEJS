const User = require("./../models/user.model");
const Address = require("./../models/address.model");
const { deleteUsersById } = require("../controllers/user.controller");

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

    getUsers: async () => {
        const users = await User.find().populate("address");
        return users;
    },

    addressExists: async (id) => {
        const address = await Address.findOne({ id });
        return address;
    },

    updateUser: async (user, id, addressId) => {


        const address = await Address.findOneAndUpdate({ id: addressId }, user.address);

        user.address = address;

        let updatedUser = await User.findOneAndUpdate({ id }, user, {
            new: true
        }).populate("address");

        return updatedUser;

    },

    deleteUsersById: async (id) => {

        const doc = await User.findOne({ id }).populate("address");
        await doc.deleteOne();

    }



}


module.exports = repository;