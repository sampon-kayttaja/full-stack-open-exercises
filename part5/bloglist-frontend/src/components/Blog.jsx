import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
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
    <div style={blogStyle}>
      {!expanded && (
        <div>
          {blog.title} by {blog.author} <button onClick={() => setExpanded(true)}>view</button>
        </div>
      )}
      {expanded && (
        <div>
          {blog.title} by {blog.author} <button onClick={() => setExpanded(false)}>hide</button> <br />
          {blog.url} <br/>
          {blog.likes} <button onClick={() => likeBlog(blog.id)}>like</button> <br/>
          {blog.user.username} <br />
          {userCheck && (
            <button onClick={() => deleteBlog(blog.id)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog