const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')
const Blog = require('../models/blogs')

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
      title: 'testDDDD',
      url: 'test.com/DDDD',
      likes: 5
    }
    const currentBlogs = await api.get('/api/blogs')
    const currentBlogsLen = currentBlogs.body.length
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QyIiwiaWQiOiI2NWFhNzQzNzQ1NDhmOTM3ZTU4ZDE0YTYiLCJpYXQiOjE3MDU2Njk4MDJ9.UGKtPqh36VDyx4xIm89wqYkcDacbq5ryq7UUMvvlv7g'

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
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
      url: 'test_no_like.com'
    }
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QyIiwiaWQiOiI2NWFhNzQzNzQ1NDhmOTM3ZTU4ZDE0YTYiLCJpYXQiOjE3MDU2Njk4MDJ9.UGKtPqh36VDyx4xIm89wqYkcDacbq5ryq7UUMvvlv7g'

    await api
      .post('/api/blogs')
      .send(blogWithNoLikes)
      .set('Authorization', `bearer ${token}`)
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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QyIiwiaWQiOiI2NWFhNzQzNzQ1NDhmOTM3ZTU4ZDE0YTYiLCJpYXQiOjE3MDU2Njk4MDJ9.UGKtPqh36VDyx4xIm89wqYkcDacbq5ryq7UUMvvlv7g'

    await api
      .post('/api/blogs')
      .send(blogMissingURL)
      .set('Authorization', `bearer ${token}`)
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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QyIiwiaWQiOiI2NWFhNzQzNzQ1NDhmOTM3ZTU4ZDE0YTYiLCJpYXQiOjE3MDU2Njk4MDJ9.UGKtPqh36VDyx4xIm89wqYkcDacbq5ryq7UUMvvlv7g'

    await api
      .post('/api/blogs')
      .send(blogMissingTitle)
      .set('Authorization', `bearer ${token}`)
      .expect(400)

    const newBlogs = await helper.blogsInDB()
    expect(newBlogs).toHaveLength(currentBlogsLen)
  })

  test('creating a blog without a token results in bad request', async () => {
    const blogWontWork = {
      title: 'I will not work',
      author: 'No tokensiens',
      url: 'no_token.com'
    }
    
    const currentBlogs = await helper.blogsInDB()

    await api
      .post('/api/blogs')
      .send(blogWontWork)
      .expect(401)
    const newBlogs = await helper.blogsInDB()
    expect(newBlogs).toHaveLength(currentBlogs.length)
  })
})

describe('DELETE request tests', () => {
  test('returns status 400 if id is invalid', async () => {
    const fakeBlog = new Blog()
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QyIiwiaWQiOiI2NWFhNzQzNzQ1NDhmOTM3ZTU4ZDE0YTYiLCJpYXQiOjE3MDU2Njk4MDJ9.UGKtPqh36VDyx4xIm89wqYkcDacbq5ryq7UUMvvlv7g'
    await api
      .delete(`/api/blogs/${fakeBlog._id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
  })

  test('Delete succeds with status 204 if id is valid', async () => {
    const currentBlogs = await api.get('/api/blogs')
    const currentBlogsLen = currentBlogs.body.length
    const blogToDelete = currentBlogs.body[0]
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjY1YTk3YjBiNjM3ZWQxY2NiYmUyMmZkNyIsImlhdCI6MTcwNTcwMzgyMn0.rgzgE_5ZHFfYQRgw6Vo3j7897cuLUxy365MPRdDZ3BQ'
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const newBlogs = await helper.blogsInDB()
    expect(newBlogs).toHaveLength(currentBlogsLen - 1)
  })
})

describe('PUT request tests', () => {
  test('Put return status 400 if id is not valid', async () => {
    const updatedInfo = {likes: 0}
    const fakeBlog = new Blog()
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjY1YTk3YjBiNjM3ZWQxY2NiYmUyMmZkNyIsImlhdCI6MTcwNTcwMzgyMn0.rgzgE_5ZHFfYQRgw6Vo3j7897cuLUxy365MPRdDZ3BQ'

    await api
      .put(`/api/blogs/${fakeBlog._id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
  })

  test('put succeded with status 200', async () => {
    const currentBlogs = await helper.blogsInDB()
    const blogToUpdate = currentBlogs[0]
    const blogUpdatedContent = {
      likes: 111
    }
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjY1YTk3YjBiNjM3ZWQxY2NiYmUyMmZkNyIsImlhdCI6MTcwNTcwNDE1MX0.pPMOTJO7yDlAUDxlTU-7n5iKYNSSvUekAqvQ6rzgYv0'

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogUpdatedContent)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
  })
})