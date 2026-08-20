import { useParams, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Box, Link } from "@mui/material";
import {
  useBlogs,
  useLikeBlog,
  useDeleteBlog,
  useCommentBlog,
} from "../hooks/useBlogs";
import { useSetNotification } from "../contexts/NotificationContexts";
import CommentForm from "./CommentForm";

const Blog = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const setNotification = useSetNotification();

  const { data: blogs = [], isLoading } = useBlogs();
  const likeBlogMutation = useLikeBlog();
  const deleteBlogMutation = useDeleteBlog();
  const commentBlogMutation = useCommentBlog();

  if (isLoading) return <div>loading...</div>;

  const blog = blogs.find((b) => b.id === id);
  if (!blog) return <div>blog not found</div>;

  const userCheck = user && blog.user && user.username === blog.user.username;

  const ensureProtocol = (url) => {
    if (!url) return url;
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
  };

  const handleLike = () => {
    likeBlogMutation.mutate(
      { id: blog.id, blog },
      {
        onError: () =>
          setNotification(
            `the blog '${blog.title}' was already removed from server`,
            3,
          ),
      },
    );
  };

  const handleDelete = () => {
    if (user.username !== blog.user.username) {
      setNotification("unauthorized: not the creator of this blog", 3);
      return;
    }
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id, {
        onSuccess: () => {
          setNotification(
            `the blog '${blog.title}' was removed successfully`,
            3,
          );
          navigate("/");
        },
        onError: () =>
          setNotification(
            `the blog '${blog.title}' was already removed from server`,
            3,
          ),
      });
    }
  };

  const handleCommentSubmit = async (commentObject) => {
    try {
      await commentBlogMutation.mutateAsync({
        id: blog.id,
        comment: commentObject.comment,
      });
      setNotification("comment added successfully", 3);
      return true;
    } catch (error) {
      console.error("Comment submission failed:", error);
      console.error("Server response:", error.response?.data);
      setNotification("error adding comment", 3);
      return false;
    }
  };

  return (
    <Box
      sx={{
        mt: 1,
        p: 3,
        maxWidth: 480,
      }}
      className="blog"
    >
      <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
        {blog.title}
      </Typography>

      <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
        by {blog.author}
      </Typography>

      <Box sx={{ mb: 1 }}>
        <Link
          href={ensureProtocol(blog.url)}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          {blog.url}
        </Link>
      </Box>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
        Added by {blog.user.username}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="body1">{blog.likes} likes</Typography>

        {user && (
          <Button
            variant="outlined"
            size="small"
            onClick={handleLike}
            disabled={likeBlogMutation.isPending}
          >
            LIKE
          </Button>
        )}

        {userCheck && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleDelete}
          >
            REMOVE
          </Button>
        )}
      </Box>

      <CommentForm handleSubmit={handleCommentSubmit} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
          Comments
        </Typography>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default Blog;
