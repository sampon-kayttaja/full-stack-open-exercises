const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs are identified by id and not _id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    assert.strictEqual(blog._id, undefined)
    assert.notStrictEqual(blog.id, undefined)
  })
})

test('blogs are actually added', async () => {
  const newBlog = {
    title: 'added blog',
    author: 'test_author2',
    url: 'definitely_a_real_url',
    likes: 3,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogList2 = await api.get('/api/blogs')

  assert.strictEqual(blogList2.body.length, helper.initialBlogs.length + 1)
})

test('if no likes are defined, default to 0', async () => {
  const newBlog = {
    title: '0 likes tests',
    author: 'test_author',
    url: 'test_url3',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('if no title or url, 400 bad request', async () => {
  const newBlog = {
    author: 'test_author',
    likes: '1000',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const curBlogs = await helper.blogsInDb()

  assert.strictEqual(curBlogs.length, helper.initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})