import { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
} from "react-router-dom";
import "./index.css";

import Notification from "./components/Notif";
import Navigation from "./components/Navigation";
import Blog from "./components/Blog";
import User from "./components/User";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AddNewBlog from "./pages/AddBlog";
import AllUsersPage from "./pages/AllUsersPage";
import NotFoundPage from "./pages/NotFoundPage";

import {
  useBlogs,
  useCreateBlog,
  useLikeBlog,
  useDeleteBlog,
} from "./hooks/useBlogs";
import { useUser, useLogin, useLogout } from "./hooks/useUser";
import { useUsers } from "./hooks/useUsers";
import { useSetNotification } from "./contexts/NotificationContexts";

import { Container } from "@mui/material";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setNotification = useSetNotification();

  const { data: user } = useUser();
  const loginMutation = useLogin();
  const logout = useLogout();

  const { data: blogs = [], isLoading, isError } = useBlogs();
  const { data: users = [] } = useUsers();
  const createBlogMutation = useCreateBlog();
  const likeBlogMutation = useLikeBlog();
  const deleteBlogMutation = useDeleteBlog();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await loginMutation.mutateAsync({ username, password });
      setUsername("");
      setPassword("");
      setNotification("login successful", 3);
      return true;
    } catch {
      setNotification("wrong credentials", 3);
      return false;
    }
  };

  const handleLogout = () => {
    logout();
    setNotification("logout successful", 3);
  };

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await createBlogMutation.mutateAsync(blogObject);
      setNotification(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        3,
      );
      return true;
    } catch {
      setNotification("error creating blog", 3);
      return false;
    }
  };

  const handleLike = (id) => {
    const blog = blogs.find((b) => b.id === id);
    likeBlogMutation.mutate(
      { id, blog },
      {
        onError: () =>
          setNotification(
            `the blog '${blog.title}' was already removed from server`,
            3,
          ),
      },
    );
  };

  const deleteBlog = (id) => {
    const blog = blogs.find((b) => b.id === id);
    if (user.username !== blog.user.username) {
      setNotification("unauthorized: not the creator of this blog", 3);
      return;
    }
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(id, {
        onSuccess: () =>
          setNotification(
            `the blog '${blog.title}' was removed successfully`,
            3,
          ),
        onError: () =>
          setNotification(
            `the blog '${blog.title}' was already removed from server`,
            3,
          ),
      });
    }
  };

  const location = useLocation();

  return (
    <Container>
      <div>
        <Navigation user={user} logout={handleLogout} />
        <Notification />

        <ErrorBoundary key={location.pathname}>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  user={user}
                  blogs={blogs}
                  handleLike={handleLike}
                  deleteBlog={deleteBlog}
                  likeInProgress={likeBlogMutation.isPending}
                />
              }
            />
            <Route
              path="/login"
              element={
                <LoginPage
                  username={username}
                  password={password}
                  handleUsernameChange={({ target }) =>
                    setUsername(target.value)
                  }
                  handlePasswordChange={({ target }) =>
                    setPassword(target.value)
                  }
                  handleLogin={handleLogin}
                  user={user}
                />
              }
            />
            <Route
              path="/addblog"
              element={
                user ? (
                  <AddNewBlog user={user} addBlog={addBlog} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/blogs/:id" element={<Blog user={user} />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/users"
              element={
                user ? <AllUsersPage users={users} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/users/:id"
              element={<User users={users} blogs={blogs} />}
            />
          </Routes>
        </ErrorBoundary>
      </div>
    </Container>
  );
};

export default App;
