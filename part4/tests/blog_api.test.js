const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

afterAll(async () => {
  await mongoose.connection.close()
})

describe('GET request tests', () => {
  test('objects contain the id property', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const contents = response.body.map((r) => {
      expect(r.id).toBeDefined()
    })
  })
})

describe('POST request tests', () => {
  test('new blog post is created with POST request', async () => {
    const newBlog = {
      title: 'This is a test',
      author: 'Test Testingus',
      url: 'test.com',
      likes: 5
    }
    const currentBlogs = await api.get('/api/blogs')
    const currentBlogsLen = currentBlogs.body.length

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDB() // helper function returns the body of the GET request
    expect(response).toHaveLength(currentBlogsLen + 1)
    const authors = response.map(r => r.author)
    expect(authors).toContain('Test Testingus')
  })
  
  test('creating a blog with no likes defaults to 0', async () => {
    const blogWithNoLikes = {
      title: 'I was created with no likes',
      author: 'Not Likingus',
      url: 'test_no_like.com'
    }
    await api
      .post('/api/blogs')
      .send(blogWithNoLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await helper.blogsInDB()
    response.map((r) => {
      console.log(r)
      expect(r.likes).toBeDefined()
    })
  })

  test('creating a blog with no URL results in bad request', async () => {
    const blogMissingURL = {
      title: 'I was created with no URL',
      author: 'Not URLinus'
    }

    const currentBlogs = await api.get('/api/blogs')
    const currentBlogsLen = currentBlogs.body.length

    await api
      .post('/api/blogs')
      .send(blogMissingURL)
      .expect(400)
    
    const newBlogs = await helper.blogsInDB()
    expect(newBlogs).toHaveLength(currentBlogsLen)
  })

  test('creating a blog with no title results in bad request', async () => {
    const blogMissingTitle = {
      author: 'Not Titlenus',
      url: 'no_title.com'
    }

    const currentBlogs = await api.get('/api/blogs')
    const currentBlogsLen = currentBlogs.body.length

    await api
      .post('/api/blogs')
      .send(blogMissingTitle)
      .expect(400)

    const newBlogs = await helper.blogsInDB()
    expect(newBlogs).toHaveLength(currentBlogsLen)
  })
})