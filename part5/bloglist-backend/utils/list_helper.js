const dummy = (blogs) => {
  return 1
}

// total likes
const likesSum = (sum, blog) => {
  return sum + blog.likes
}

const totalLikes = (blogs) => {
  return blogs.reduce(likesSum, 0)
}

// favorite blog
const favHelper = (curFav, curBlog) => {
  return curFav.likes >= curBlog.likes
    ? curFav
    : curBlog
}

const favoriteBlog = (blogs) => {
  return blogs.reduce(favHelper, 0)
}

// most blogs
const countHelper = (acc, blog) => {
  acc[blog.author] = (acc[blog.author] || 0) + 1
  return acc
}
const countPerAuthor = (blogs) => blogs.reduce(countHelper, {})

const mostBlogs = (blogs) => {
  const counts = countPerAuthor(blogs)
  return Object.entries(counts).reduce((topAuthor, [author, count]) =>
    count > topAuthor.blogs ? { author, blogs: count } : topAuthor, { blogs : 0 })
}

// most likes
const likesHelper = (acc, blog) => {
  acc[blog.author] = (acc[blog.author] || 0) + blog.likes
  return acc
}

const likesPerAuthor = (blogs) => blogs.reduce(likesHelper, {})

const mostLikes = (blogs) => {
  const likeCounts = likesPerAuthor(blogs)
  return Object.entries(likeCounts).reduce((topAuthor, [author, likes]) =>
    likes > topAuthor.likes ? { author, likes } : topAuthor, { likes : 0})
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}