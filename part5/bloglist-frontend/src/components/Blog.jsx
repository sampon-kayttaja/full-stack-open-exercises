import { useState } from 'react'

const Blog = ({ blog, handleLike, deleteBlog, user, likeInProgress }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const userCheck = user.username === blog.user.username

  return (
    <div style={blogStyle} className="blog">
      {!expanded && (
        <div>
          {blog.title} by {blog.author} <button onClick={() => setExpanded(true)}>view</button>
        </div>
      )}
      {expanded && (
        <div>
          {blog.title} by {blog.author} <button onClick={() => setExpanded(false)}>hide</button> <br />
          <div>{blog.url}</div>
          <div>{blog.likes} <button onClick={() => handleLike(blog.id)} disabled={likeInProgress}>like</button></div>
          <div>{blog.user.username}</div>
          {userCheck && (
            <button onClick={() => deleteBlog(blog.id)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog