const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {id: 1, username: 1, name: 1})
    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!request.token) {
    return response.status(401).json({error: "You are not authenticated"})
  }
  const user = await User.findById(request.user)
  const blog = new Blog({
    title: body.title,
    author: user.name,
    url: body.url,
    likes: body.likes,
    user: user.id,
    content: body.content,
    comments: [],
    userLikes: []
  })

  if (!blog.title || !blog.url || !blog.content) {
    response.status(400).end()
  } else {
    if (!blog.likes) {
      blog.likes = 0
    }
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const blogId = request.params.id //fetch the id from the URI
  const comment = request.body.comment
  const blog = await Blog.findById(blogId)
  blog.comments.push(comment)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  if (!request.token) {
    return response.status(401).json({error: "You are not authenticated"})
  }
  const toDelete = await Blog.findById(request.params.id)
  if (!toDelete) {
    response.status(400).end()
  } else if (toDelete.user.toString() !== request.user) {
    response.status(401).json({error: "You are not the owner of this Blog"})
  } else {
    await Blog.findByIdAndDelete(request.params.id) // deletes the blog post
    // deleting blog from the blogs array in the users`s object
    const ownerOfBlog = await User.findById(toDelete.user.toString())
    ownerOfBlog.blogs = ownerOfBlog.blogs.filter((blog) => blog.toString() !== toDelete.id.toString())
    ownerOfBlog.save()
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const toUpdate = await Blog.findById(request.params.id)
  console.log(toUpdate)
  const userWhoLiked = await User.findById(request.user)
  const username = userWhoLiked.username
  console.log(userWhoLiked)
  if (toUpdate.length === 0) {
    return response.status(400).end()
  } else {
    const body = request.body
    console.log(body)
    const blog = {
      title: toUpdate.title,
      author: toUpdate.author,
      url: toUpdate.url,
      likes: body.likes,
      content: toUpdate.content,
      comments: toUpdate.comments,
      userLikes: toUpdate.userLikes
    }
    blog.userLikes.push(username)
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    console.log(updatedBlog)
    response.json(updatedBlog)
  }
})

module.exports = blogsRouter