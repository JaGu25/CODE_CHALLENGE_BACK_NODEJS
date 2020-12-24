const userRepository = require('../repositories/user.repository');
const { updateUser } = require('../validators/user.validate');

const service = {

    createUser: async (user) => {

        if (await userRepository.getUser(user.id)) throw new Error('A user with that ID already exists.');
        if (await userRepository.addressExists(user.address.id)) throw new Error('A address with that ID already exists.');

        const addressCreated = await userRepository.createAddress(user.address);
        user.address = addressCreated;

        const userCreated = await userRepository.createUser(user);
        return userCreated;

    },

    getUserById: async (id) => {

        let user = await userRepository.getUser(id);
        if (!user) throw new Error('User does not exists.')

        return user;

    },

    getUsers: async () => {
        return await userRepository.getUsers();
    },


    updateUser: async (user, id) => {

  
        let findUser = await userRepository.getUser(id);

        if (!findUser) throw new Error('User does not exists.');


        if (findUser && findUser.id !== id) throw new Error('A user with that ID already exists.');

        let findAdress = await userRepository.addressExists(user.address.id);

        if (findAdress && findUser.address.id != user.address.id) throw new Error('A address with that ID already exists.');

        let updatedUser = await userRepository.updateUser(user, id, findUser.address.id);

        return updatedUser;

    },

    deleteUserById: async(id) => {

        let findUser = await userRepository.getUser(id);

        if (!findUser) throw new Error('User does not exists.');

        await userRepository.deleteUsersById(id);


    }

}




module.exports = service;