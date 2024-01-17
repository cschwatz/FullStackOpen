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

describe('existance of objects', () => {
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

describe('creating blog posts', () => {
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
})