import { useState } from 'react'
import { TextField, Button } from '@mui/material'

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
          <TextField
            label="title"
            type="text"
            value={newBlog.title}
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          />
        </div>
        <div>
          <TextField
            style={{ marginTop: 10 }}
            label="author"
            type="text"
            value={newBlog.author}
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
          />
        </div>
        <div>
          <TextField
            style={{ marginTop: 10 }}
            label="url"
            type="text"
            value={newBlog.url}
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          />
        </div>
        <div><Button type="submit" variant="contained" style={{ marginTop: 10 }}>add</Button></div>
      </form>
    </>
  )
}

export default BlogForm