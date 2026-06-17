const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/', async (request, response) => {
  const savedBlog = await new Blog(request.body).save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
