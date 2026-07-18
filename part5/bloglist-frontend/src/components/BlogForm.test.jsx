import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls the submit handler with the correct details', async () => {
  const user = userEvent.setup()
  const addBlog = vi.fn()

  render(<BlogForm addBlog={addBlog} />)

  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'testing a form...')
  await user.type(authorInput, 'test author')
  await user.type(urlInput, 'test url')
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('testing a form...')
  expect(addBlog.mock.calls[0][0].author).toBe('test author')
  expect(addBlog.mock.calls[0][0].url).toBe('test url')
})