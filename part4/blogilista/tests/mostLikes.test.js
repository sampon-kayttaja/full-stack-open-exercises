const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most likes', () => {
  const testList = [{
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '4a422aa7npm 1b54a676234d17f8',
      title: 'a real blog post',
      author: 'a real author',
      url: 'http://www.testurl.com',
      likes: 2,
      __v: 0
    },
    {
      _id: '3a422aa71b54a676234d17f8',
      title: 'the second real blog post',
      author: 'a real author',
      url: 'http://www.testurl2.com',
      likes: 1,
      __v: 0
    }]

  const correctResult = {
    author: 'Edsger W. Dijkstra', 
    likes: 5
  }

  test('test for who has the most likes across all their blogs', () => {
    const result = listHelper.mostLikes(testList)
    assert.deepStrictEqual(correctResult, result)
  })
})