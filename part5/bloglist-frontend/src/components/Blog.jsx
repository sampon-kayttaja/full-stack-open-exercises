import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography, Box, Link } from '@mui/material'

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
    <Box sx={{
      mt: 1,
      p: 3,
      maxWidth: 480,
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2
    }} className="blog">
      <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
        {blog.title}
      </Typography>

      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
        by {blog.author}
      </Typography>

      <Box sx={{ mb: 1 }}>
        <Link
          href={ensureProtocol(blog.url)}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          {blog.url}
        </Link>
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        Added by {blog.user.username}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body1">{blog.likes} likes</Typography>

        {user && (
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleLike(blog.id)}
            disabled={likeInProgress}
          >
            LIKE
          </Button>
        )}

        {userCheck && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => deleteBlog(blog.id)}
          >
            REMOVE
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default Blog