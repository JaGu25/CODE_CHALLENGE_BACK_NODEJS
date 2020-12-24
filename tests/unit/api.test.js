const request = require('supertest')
const app = require('../../src/services/server.service');
const Helper = require('../utils/helper.tests');
const helper = new Helper();

const userTest = {
    "id": "9999",
    "name": "test",
    "email": "albites@gmail.com",
    "birthDate": "2012/12/23",
    "address": {
        "id": "9999",
        "street": "test",
        "state": "test",
        "city": "test",
        "country": "test",
        "zip": "test"
    }
}

describe('Api Tets Oks', () => {


    it('get All Users', async () => {
        const res = await helper.apiServer
            .get('/v1/api/users/getUsers')
        expect(res.statusCode).toEqual(200)
    })

    it('Create User', async () => {


        const res1 = await helper.apiServer
            .post('/v1/api/users/createUsers')
            .send(userTest)

        expect(res1.statusCode).toEqual(201)

        const id = res1.body.results.user.id;

        const res2 = await helper.apiServer
            .delete(`/v1/api/users/deleteUsersById/${id}`)

        expect(res2.statusCode).toEqual(200)

    })


    it('get User By Id ', async () => {


        const res1 = await helper.apiServer
            .post('/v1/api/users/createUsers')
            .send(userTest)

        expect(res1.statusCode).toEqual(201)

        const id = res1.body.results.user.id;

        const res2 = await helper.apiServer
            .get(`/v1/api/users/getUsersById/${id}`)


        expect(res2.statusCode).toEqual(200)

        const res3 = await helper.apiServer
            .delete(`/v1/api/users/deleteUsersById/${id}`)

        expect(res3.statusCode).toEqual(200)

    })


    it('Delete User By Id ', async () => {


        const res1 = await helper.apiServer
            .post('/v1/api/users/createUsers')
            .send(userTest)

        expect(res1.statusCode).toEqual(201)

        const id = res1.body.results.user.id;

        const res2 = await helper.apiServer
            .delete(`/v1/api/users/deleteUsersById/${id}`)

        expect(res2.statusCode).toEqual(200)

    })


    it('Update User By Id ', async () => {


        const res1 = await helper.apiServer
            .post('/v1/api/users/createUsers')
            .send(userTest)

        expect(res1.statusCode).toEqual(201)

        const id = res1.body.results.user.id;

        const res2 = await helper.apiServer
            .put(`/v1/api/users/updateUsersById/${id}`)
            .send(userTest)

        expect(res2.statusCode).toEqual(200)

        const res3 = await helper.apiServer
            .delete(`/v1/api/users/deleteUsersById/${id}`)

        expect(res3.statusCode).toEqual(200)

    })






})


describe('Api Tets Errors', () => {

    it('Create User Expect User Exists', async () => {

        const res1 = await helper.apiServer
            .post('/v1/api/users/createUsers')
            .send(userTest)

        expect(res1.statusCode).toEqual(201)

        const id = res1.body.results.user.id;

        const res2 = await helper.apiServer
            .post('/v1/api/users/createUsers')
            .send(userTest)

        expect(res2.statusCode).toEqual(400)

        const res3 = await helper.apiServer
            .delete(`/v1/api/users/deleteUsersById/${id}`)

        expect(res3.statusCode).toEqual(200)

    })


    it('User Find By Id Expect User  Not Exists', async () => {

        const res = await helper.apiServer
            .get(`/v1/api/users/getUsersById/9999`)

        expect(res.statusCode).toEqual(404);

    })


    it('User Find By Id Expect Invalid User Id', async () => {

        const res = await helper.apiServer
            .get(`/v1/api/users/getUsersById/s`)

        expect(res.statusCode).toEqual(400);

    })

    it('Delete User By Id Expect Usert Not Exists', async () => {

        const res = await helper.apiServer
            .delete(`/v1/api/users/deleteUsersById/999`)

        expect(res.statusCode).toEqual(404);

    })

    it('Delete User By IdExpect Invalid User Id', async () => {

        const res = await helper.apiServer
            .delete(`/v1/api/users/deleteUsersById/s`)

        expect(res.statusCode).toEqual(400);

    })

    it('Update User By Id Expect Invalid User Id', async () => {

        const res = await helper.apiServer
            .put(`/v1/api/users/updateUsersById/ss`)
            .send(userTest)

        expect(res.statusCode).toEqual(400);

    })

    it('Update User By Id Expect User Not Exists', async () => {

        const res = await helper.apiServer
            .put(`/v1/api/users/updateUsersById/99999`)
            .send(userTest)

        expect(res.statusCode).toEqual(404);

    })

})

