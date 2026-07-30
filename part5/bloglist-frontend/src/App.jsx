import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import { ErrorMessage, SuccessMessage } from './components/Notif'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import AddNewBlog from './pages/AddBlog'
import Blog from './components/Blog'
import { Container } from '@mui/material'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [likeInProgress, setLikeInProgress] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  const showError = (msg) => {
    setErrorMessage(msg)
    setTimeout(() => setErrorMessage(null), 3000)
  }

  const showSuccess = (msg) => {
    setSuccessMessage(msg)
    setTimeout(() => setSuccessMessage(null), 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showSuccess('login successful')
      return true
    } catch {
      showError('wrong credentials')
      return false
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    showSuccess('logout successful')
  }

  const addBlog = (blogObject) => {
    return blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        showSuccess(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        return true
      })
      .catch(() => {
      showError('error creating blog')
      return false
      })
  }

  const handleLike = (id) => {
    setLikeInProgress(true)
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => (b.id !== id ? b : returnedBlog)))
      })
      .catch(() => showError(`the blog '${blog.title}' was already removed from server`))
      .finally(() => setLikeInProgress(false))
  }

  const deleteBlog = (id) => {
    const blog = blogs.find(b => b.id === id)

    if (user.username !== blog.user.username) {
      showError('unauthorized: not the creator of this blog')
      return
    }

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== id))
          showSuccess(`the blog '${blog.title}' was removed successfully`)
        })
        .catch(() => showError(`the blog '${blog.title}' was already removed from server`))
    }
  }

  return (
    <Container>
      <div>
        <Navigation user={user} logout={logout} />
        <ErrorMessage message={errorMessage} />
        <SuccessMessage message={successMessage} />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                user={user}
                blogs={blogs}
                handleLike={handleLike}
                deleteBlog={deleteBlog}
                likeInProgress={likeInProgress}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleLogin={handleLogin}
                user={user}
              />
            }
          />
          <Route
            path="/addblog"
            element={ user ?
              <AddNewBlog
                user={user}
                addBlog={addBlog}
              /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <Blog
                blogs={blogs} 
                handleLike={handleLike}
                deleteBlog={deleteBlog}
                user={user}
                likeInProgress={likeInProgress}
              />
            }
          />
        </Routes>
      </div>
    </Container>
  )
}

export default App