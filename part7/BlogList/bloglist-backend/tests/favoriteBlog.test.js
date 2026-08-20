const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("favorite blog", () => {
  const testList = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "4a422aa71b54a676234d17f8",
      title: "a real blog post",
      author: "a real author",
      url: "http://www.testurl.com",
      likes: 4,
      __v: 0,
    },
  ];

  const correctResult = {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  };

  (test("test for favorite blog"),
    () => {
      const result = listHelper.favoriteBlog(testList);
      assert.DeepStrictEqual(result, correctResult);
    });
});
