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

describe('DELETE request tests', () => {
  test('returns status 400 if id is invalid', async () => {
    const fakeId = '123'
    await api
      .delete(`/api/blogs/${fakeId}`)
      .expect(400)
  })

  test('succed with status 204 if id is valid', async () => {
    const currentBlogs = await api.get('/api/blogs')
    const currentBlogsLen = currentBlogs.body.length
    const blogToDelete = currentBlogs.body[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const newBlogs = await helper.blogsInDB()
    expect(newBlogs).toHaveLength(currentBlogsLen - 1)
  })
})

describe('PUT request tests', () => {
  test('return status 400 if id is not valid', async () => {
    const updatedInfo = {likes: 0}
    const fakeId = '123'

    await api
      .put(`/api/blogs/${fakeId}`)
      .expect(400)
  })

  test('succeded with status 200', async () => {
    const currentBlogs = await api.get('/api/blogs')
    const blogToUpdate = currentBlogs.body[0]
    const blogUpdatedContent = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: 111
    }
    console.log(currentBlogs)
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogUpdatedContent)
      .expect(200)
  })
})