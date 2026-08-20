const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const api = supertest(app);

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });
  await user.save();

  const result = await api
    .post("/api/login")
    .send({ username: "root", password: "sekret" });

  token = result.body.token;

  await Blog.insertMany(
    helper.initialBlogs.map((blog) => ({ ...blog, user: user._id })),
  );
});

// adding and deleting blogs

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("blogs are identified by id and not _id", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((blog) => {
    assert.strictEqual(blog._id, undefined);
    assert.notStrictEqual(blog.id, undefined);
  });
});

test("blogs are actually added", async () => {
  const newBlog = {
    title: "added blog",
    author: "test_author2",
    url: "definitely_a_real_url",
    likes: 3,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogList2 = await api.get("/api/blogs");

  assert.strictEqual(blogList2.body.length, helper.initialBlogs.length + 1);
});

test("if no likes are defined, default to 0", async () => {
  const newBlog = {
    title: "0 likes tests",
    author: "test_author",
    url: "test_url3",
  };

  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

test("if no title or url, 400 bad request", async () => {
  const newBlog = {
    author: "test_author",
    likes: "1000",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);

  const curBlogs = await helper.blogsInDb();

  assert.strictEqual(curBlogs.length, helper.initialBlogs.length);
});

test("deleting post deletes posts", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  const ids = blogsAtEnd.map((n) => n.id);
  assert(!ids.includes(blogToDelete.id));

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
});

test("editing posts edits posts", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToEdit = blogsAtStart[0];

  const updatedBlog = {
    title: blogToEdit.title,
    author: blogToEdit.author,
    url: blogToEdit.url,
    likes: blogToEdit.likes + 1,
  };

  const response = await api
    .put(`/api/blogs/${blogToEdit.id}`, updatedBlog)
    .set("Authorization", `Bearer ${token}`);

  assert.notStrictEqual(response.body.likes, blogToEdit.likes);
});

test("adding blog fails proper statuscode and message if no token or invalid token", async () => {
  const newBlog = {
    title: "added blog",
    author: "test_author2",
    url: "definitely_a_real_url",
    likes: 3,
  };

  const result = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer thisisnotarealtoken`)
    .send(newBlog)
    .expect(401);

  const blogsAtEnd = await helper.blogsInDb();
  assert(result.body.error.includes("token missing or invalid"));

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

// user creation

test("creation fails with proper statuscode and message if username already taken", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "root",
    name: "Superuser",
    password: "salainen",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  assert(result.body.error.includes("expected `username` to be unique"));

  assert.strictEqual(usersAtEnd.length, usersAtStart.length);
});

test("creation fails with proper statuscode and message if username or password too short", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "user",
    name: "Superuser",
    password: "sa",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert(result.body.error.includes("must be at least"));

  const usersAtEnd = await helper.usersInDb();
  assert.strictEqual(usersAtEnd.length, usersAtStart.length);
});

test("creation succeeds with a fresh username", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "mluukkai",
    name: "Matti Luukkainen",
    password: "salainen",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

  const usernames = usersAtEnd.map((u) => u.username);
  assert(usernames.includes(newUser.username));
});

after(async () => {
  await mongoose.connection.close();
});
