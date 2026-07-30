import { useState } from 'react'
import { useParams } from 'react-router-dom'

const Blog = ({ blogs, handleLike, deleteBlog, user, likeInProgress }) => {
  const { id } = useParams()
  const blog = blogs.find(b => b.id === id)

  if (!blog) return <div>blog not found</div>

  const userCheck = user && blog.user && user.username === blog.user.username

  const blogStyle = {
    paddingTop: '10px',
    paddingLeft: '10px'
  }

  const ensureProtocol = (url) => {
    if (!url) return url
    return /^https?:\/\//i.test(url) ? url : `https://${url}`
  }

  return (  
    <div style={blogStyle} className="blog">
      <div><h2>{blog.title} by {blog.author}</h2></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div><a href={ensureProtocol(blog.url)} target="_blank" rel="noopener noreferrer">{blog.url}</a></div>
        <div>likes: {blog.likes}{' '} {user && (
          <button onClick={() => handleLike(blog.id)} disabled={likeInProgress}>like</button>
        )}</div>
        <div>Added by {blog.user.username}</div>
        {userCheck && (
          <div><button onClick={() => deleteBlog(blog.id)}>remove</button></div>
        )}
      </div>
    </div>
  )
}

export default Blog