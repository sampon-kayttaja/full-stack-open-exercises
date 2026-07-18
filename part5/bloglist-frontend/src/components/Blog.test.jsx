import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Testing a blog',
    author: 'Author Name',
    url: 'arealurl.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  const user = {
    username: 'testuser',
    name: 'Test User'
  }
  
  render(<Blog blog={blog} user={user} />)

  const element = screen.getByText('Testing a blog by Author Name')
  expect(element).toBeDefined()
})

test('when view button is clicked, url and likes are displayed', async () => {
  const blog = {
    title: 'Testing a blog',
    author: 'Author Name',
    url: 'arealurl.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  const user = {
    username: 'testuser',
    name: 'Test User'
  }

  render(<Blog blog={blog} user={user} />)

  const userEventInstance = userEvent.setup()

  const viewButton = screen.getByText('view')

  await userEventInstance.click(viewButton)
    const urlElement = screen.getByText('arealurl.com')
    const likesElement = screen.getByText('5')
    const userElement = screen.getByText('testuser')

    expect(urlElement).toBeDefined()
    expect(likesElement).toBeDefined()
    expect(userElement).toBeDefined()
})

test('if like button is clicked twice, the event handler is called twice', async () => {
      const blog = {
    title: 'Testing a blog',
    author: 'Author Name',
    url: 'arealurl.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  const user = {
    username: 'testuser',
    name: 'Test User'
  }

  const mockHandler = vi.fn()
  
  render(<Blog blog={blog} user={user} likeBlog={mockHandler} />)

  const userEventInstance = userEvent.setup()

  const viewButton = screen.getByText('view')

  await userEventInstance.click(viewButton)
    const likeButton = screen.getByText('like')
    await userEventInstance.click(likeButton)
    await userEventInstance.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
