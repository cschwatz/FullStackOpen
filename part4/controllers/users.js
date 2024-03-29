const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')
const Blog = require('../models/blogs')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})
    const userBlogs = await Blog.find({})

    response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body

    if (password === undefined || password.length < 3) {
        return response.status(401).json({error: "password is missing"})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    try { 
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch(exception) {
        next(exception)
    }
})

module.exports = usersRouter