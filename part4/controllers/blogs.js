const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {id: 1, username: 1, name: 1})
    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!request.token) {
    return response.status(401).json({error: "You are not authenticated"})
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
  if (!decodedToken.id) {
    return response.status(401).json({error: 'token invalid'})
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: user.name,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  if (!blog.title || !blog.url) {
    response.status(400).end()
  } else if (!blog.likes) {
    blog.likes = 0
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  if (!request.token) {
    return response.status(401).json({error: "You are not authenticated"})
  }

  const toDelete = await Blog.findById(request.params.id)
  const currentUser = jwt.verify(request.token, process.env.SECRET) //returns username, id, name
  if (!toDelete) {
    response.status(400).end()
  } else if (toDelete.user.toString() !== currentUser.id.toString()) {
    response.status(401).json({error: "You are not the owner of this Blog"})
  } else {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const toUpdate = await Blog.find({id: request.params.id})
  if (toUpdate.length === 0) {
    return response.status(400).end()
  } else {
    const body = request.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog)
  }
})

module.exports = blogsRouter