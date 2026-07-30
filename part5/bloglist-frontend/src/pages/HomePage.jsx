import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import { Link } from 'react-router-dom'

const HomePage = ({ user, blogs, addBlog, handleLike, deleteBlog, likeInProgress }) => {
  const blogsSorted = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h3>Blogs:</h3>
      <ul>
        {blogsSorted.map(blog => (
          <li key={blog.id} style={{ marginBottom: '10px' }}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage