const Blog = require('../models/blogs')
const User = require('../models/users')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    let likes = 0
    blogs.forEach(blog => likes += blog.likes)
    return likes
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let highestLiked = {likes: 0}
    blogs.forEach((blog) => {
        if (blog.likes > highestLiked.likes) {
            highestLiked = blog
        }
    })
    return highestLiked
}

const mostBlogs = (blogs) => {
    const blogMap = new Map()
    blogs.forEach((blog) => {
        if (blogMap.has(blog.author)) {
            blogMap.set(blog.author, blogMap.get(blog.author) + 1)
        } else {
            blogMap.set(blog.author, 1)
        }
    })
    let mostBlogs = {'author': '', 'blogs': 0}
    blogMap.forEach((blogs, author) => {
        if (blogs > mostBlogs.blogs) {
            mostBlogs = {'author': author, 'blogs': blogs}
        }
    })
    return mostBlogs
}

const mostLikes = (blogs) => {
    const blogMap = new Map()
    blogs.forEach((blog) => {
        if (blogMap.has(blog.author)) {
            blogMap.set(blog.author, blogMap.get(blog.author) + blog.likes)
        } else {
            blogMap.set(blog.author, blog.likes)
        }
    })
    let mostLikes = {'author': '', 'likes': 0}
    blogMap.forEach((likes, author) => {
        console.log(author, likes)
        if (likes > mostLikes.likes) {
            mostLikes = {'author': author, 'likes': likes}
        }
    })
    return mostLikes 
}

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    blogsInDB,
    usersInDB
}