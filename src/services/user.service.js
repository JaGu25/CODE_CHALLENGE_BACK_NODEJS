const userRepository = require('../repositories/user.repository');

const service = {

    createUser: async (user) => {

        if(await userRepository.getUser(user.id)) throw new Error('A user with that ID already exists.');
        if(await userRepository.addressExists(user.address.id)) throw new Error('A address with that ID already exists.');

        const addressCreated = await userRepository.createAddress(user.address);
        user.address = addressCreated;

        const userCreated = await userRepository.createUser(user);
        return userCreated;

    },

    getUserById: async (id) => {

        let user = await userRepository.getUser(id);

        if(!user) throw new Error('User does not exists.')
        
        return user;

    }

}




module.exports = service;