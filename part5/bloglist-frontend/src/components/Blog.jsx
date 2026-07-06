import { useState } from 'react'

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    <div style={blogStyle}>
      {!expanded && (
        <div>
          {blog.title} {blog.author} <button onClick={() => setExpanded(true)}>view</button>
        </div>
      )}
      {expanded && (
        <div>
          {blog.title} {blog.author} <button onClick={() => setExpanded(false)}>hide</button> <br />
          {blog.url} <br/>
          {blog.likes} <button>like</button> <br/>
          {blog.user.username}
        </div>
      )}  
    </div>   
  )
}

export default Blog