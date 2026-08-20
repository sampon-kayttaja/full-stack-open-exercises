import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";

const renderBlog = (blog, user, props = {}) => {
  return render(
    <MemoryRouter initialEntries={[`/blogs/${blog.id}`]}>
      <Routes>
        <Route
          path="/blogs/:id"
          element={<Blog blogs={[blog]} user={user} {...props} />}
        />
      </Routes>
    </MemoryRouter>,
  );
};

const blog = {
  title: "Testing a blog",
  author: "Author Name",
  url: "arealurl.com",
  likes: 5,
  id: "1",
  user: {
    username: "testuser",
    name: "Test User",
  },
};

const loggedInUser = {
  username: "testuser",
  name: "Test User",
};

const loggedInUser2 = {
  username: "testuser2",
  name: "Test User2",
};

test("renders content", () => {
  renderBlog(blog, loggedInUser);
  expect(screen.getByText("Testing a blog by Author Name")).toBeInTheDocument();
});

test("when not logged in, url and likes are displayed but remove and like arent", () => {
  renderBlog(blog);

  expect(screen.getByText("arealurl.com")).toBeInTheDocument();
  expect(screen.getByText("likes: 5")).toBeInTheDocument();
  expect(screen.getByText("Added by testuser")).toBeInTheDocument();
  expect(screen.queryByText("remove")).not.toBeInTheDocument();
  expect(screen.queryByText("like")).not.toBeInTheDocument();
});

test("when logged in, like button is displayed", async () => {
  const mockHandleLike = vi.fn();
  const mockDeleteBlog = vi.fn();

  renderBlog(blog, loggedInUser2, {
    handleLike: mockHandleLike,
    deleteBlog: mockDeleteBlog,
  });

  const likeButton = screen.getByText("like");
  const removeButton = screen.queryByText("remove");
  expect(likeButton).toBeInTheDocument();
  expect(removeButton).not.toBeInTheDocument();
});

test("when logged in, remove is displayed on own post", async () => {
  const mockHandleLike = vi.fn();
  const mockDeleteBlog = vi.fn();

  renderBlog(blog, loggedInUser, {
    handleLike: mockHandleLike,
    deleteBlog: mockDeleteBlog,
  });

  const likeButton = screen.getByText("like");
  const removeButton = screen.getByText("remove");
  expect(likeButton).toBeInTheDocument();
  expect(removeButton).toBeInTheDocument();
});
