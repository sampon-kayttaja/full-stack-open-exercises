import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Notif from './components/Notif'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage('login successful')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    )
  }
  
  const blogForm = () => {
    return (
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm addBlog={addBlog}/>
      </Togglable>
    )
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setSuccessMessage('logout successful')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage('error creating blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const likeBlog = (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))
      })
      .catch(error => {
        setErrorMessage(`the blog '${blog.title}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const blogsSorted = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h1><i>Blog App</i></h1>
      {!user && (
        <div>
          <h2>login</h2>
          <Notif.Error message={errorMessage}/>
          <Notif.Success message={successMessage}/>
          {loginForm()}
        </div>
        )}

      {user && (
        <div>
          <Notif.Error message={errorMessage}/>
          <Notif.Success message={successMessage}/>
          <p>{user.name} logged in</p>
          <button onClick={logout}>
            logout
          </button>
          {blogForm()}
          <h3>Blogs:</h3>
          {blogsSorted.map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
          )}
        </div>
      )}
    </div>
  )
} 
    
export default App