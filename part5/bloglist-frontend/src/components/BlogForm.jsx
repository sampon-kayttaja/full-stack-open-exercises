import { useState } from 'react'

const BlogForm = ({ addBlog, }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleSubmit = async event => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }
    addBlog(blogObject)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title
            <input
              type="text"
              value={newBlog.title}
              onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
            />
          </label>
        </div>
        <div>   
          <label>
            author
            <input
              type="text"
              value={newBlog.author}
              onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              value={newBlog.url}
              onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
            />
          </label>
        </div>
        <button type="submit">add</button>
    </form>
    </>
  )
}

export default BlogForm