const Blog = require('../models/blog')

const initialBlogs = [
  {
  title: 'test_blog',
  author: 'test_author',
  url: 'test_url',
  likes: 8,
  },
  {
  title: 'test_blog1',
  author: 'test_author1',
  url: 'test_url1',
  likes: 10, 
  },
  {
  title: 'test_blog2',
  author: 'test_author',
  url: 'test_url2',
  likes: 5, 
  } 
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}