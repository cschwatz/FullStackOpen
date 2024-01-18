const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')
const bcrypt = require('bcrypt')
const User = require('../models/users')

const api = supertest(app)

describe('GET request tests', () => {
    test('Can fetch all users from DB', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

describe('POST request tests', () => {
    test('return status 401 if not given username when creating user', async () => {
        const usersAtStart = await helper.usersInDB()

        const userWithoutUsername = {
            name: "No Name",
            password: "ihavenoname"
        }

        await api
            .post('/api/users')
            .send(userWithoutUsername)
            .expect(401)

        const usersAtEnd = await helper.usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('return status 401 if not given password when creating user', async () => {
        const usersAtStart = await helper.usersInDB()

        const userWithoutPass = {
            username: "NoPassword",
            name: "No Name"
        }

        await api
            .post('/api/users')
            .send(userWithoutPass)
            .expect(401)

        const usersAtEnd = await helper.usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('return status 401 if username length is less than 3 chars', async () => {
        const usersAtStart = await helper.usersInDB()

        const userWithShortUsername = {
            username: "hi",
            name: "No Name",
            password: "thisisfine"
        }

        await api
            .post('/api/users')
            .send(userWithShortUsername)
            .expect(401)

        const usersAtEnd = await helper.usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('return status 401 if password length is less than 3 chars', async () => {
        const usersAtStart = await helper.usersInDB()

        const userWithShortPass = {
            username: "imfine",
            name: "No Name",
            password: "no"
        }

        await api
            .post('/api/users')
            .send(userWithShortPass)
            .expect(401)

        const usersAtEnd = await helper.usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
  })