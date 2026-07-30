import { useState } from 'react'

const BlogForm = ({ handleSubmit }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const onSubmit = async event => {
    event.preventDefault()
    const blogObject = { title: newBlog.title, author: newBlog.author, url: newBlog.url }
    try {
      await handleSubmit(blogObject)
      setNewBlog({ title: '', author: '', url: '' })
    } catch (error) {
    }
  }

  return (
    <>
      <h2>add new</h2>
      <form onSubmit={onSubmit}>
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