const loginWith = async (page, username, password)  => {
  await page.getByText('login').click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const addBlog = async (page, testTitle, testAuthor, testUrl) => {
  await page.getByText('add blog').click()
  await page.getByLabel('title').fill(testTitle)
  await page.getByLabel('author').fill(testAuthor)
  await page.getByLabel('url').fill(testUrl)
  await page.getByRole('button', { name: 'add' }).click()
}

export { loginWith, addBlog }