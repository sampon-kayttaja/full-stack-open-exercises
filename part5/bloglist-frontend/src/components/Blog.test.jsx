import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Testing a blog',
    author: 'Author Name',
    url: 'http://example.com',
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