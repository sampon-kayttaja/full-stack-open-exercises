const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, addBlog } = require('./helper')

describe('Blog App', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'msr tester',
        username: 'test_user',
        password: 'salainen'
      }
    })

    await request.post('/api/users', {
      data: {
        name: 'msr tester 2',
        username: 'test_user_2',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Blog App')
    await expect(locator).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await loginWith(page, 'test_user', 'salainen')

    const locator = page.getByText('login successful')
    await expect(locator).toBeVisible()
  })

  test('login fails with wrong creds', async ({ page }) => {
    await loginWith(page, 'test_user', 'väärä-salasana')

    const locator = page.getByText('wrong credentials')
    await expect(locator).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test_user', 'salainen')
    })

    test('a new blog can be added', async ({ page }) => {
      const testTitle = 'E2E test blog'
      const testAuthor = 'Test Author'
      await addBlog(page, testTitle, testAuthor, 'arealurl.com')

      await expect(page.getByText(`a new blog ${testTitle} by ${testAuthor} added`))
    })
    
    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await addBlog(page, 'The Added Blog', 'Test Author', 'arealurl.com')      
      })
      
      // tests liking the first post on the app
      test('liking a blog works', async ({ page }) => {
        await page.getByRole('button', { name: 'view '}).click()
        await page.getByRole('button', { name: 'like '}).click()

        await expect(page.getByText('likes: 1'))
      })

      test('blog can be removed', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()

        page.on('dialog', async dialog => {
          await dialog.accept()
        })
      
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText('E2E test blog by Test Author')).not.toBeVisible()
      })

      test('only the user who added a blog can see remove button', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'test_user_2', 'salainen')

        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()

        //log back in with test_user
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'test_user', 'salainen')
      })
    })

    describe('multiple blogs', () => {
      beforeEach(async ({ page }) => {
        await addBlog(page, 'Blog With 0 Likes', 'Test Author', 'arealurl.com') 
        await addBlog(page, 'Blog With 1 Like', 'Test Author', 'arealurl.com') 
        await addBlog(page, 'Blog With 2 Likes', 'Test Author', 'arealurl.com')

        const blogWith1Like = page.locator('.blog').filter({ hasText: 'Blog With 1 Like' })
        await blogWith1Like.getByRole('button', { name: 'view' }).click()
        await blogWith1Like.getByRole('button', { name: 'like' }).click()
        await blogWith1Like.getByRole('button', { name: 'hide' }).click()

        const blogWith2Likes = page.locator('.blog').filter({ hasText: 'Blog With 2 Likes' })
        await blogWith2Likes.getByRole('button', { name: 'view' }).click()
        await blogWith2Likes.getByRole('button', { name: 'like' }).click()
        await blogWith2Likes.getByRole('button', { name: 'like' }).click()
        await blogWith2Likes.getByRole('button', { name: 'hide' }).click()
      })

      test('blogs are sorted by likes', async ({ page }) => {
        const blogsInOrder = await page.locator('.blog').allTextContents()
        expect(blogsInOrder[0]).toContain('Blog With 2 Likes by Test Author view')
        expect(blogsInOrder[1]).toContain('Blog With 1 Like by Test Author view')
        expect(blogsInOrder[2]).toContain('Blog With 0 Likes by Test Author view')
      })
    })
  })
})