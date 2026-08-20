import { Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";

const BlogList = ({ blogs }) => {
  const blogsSorted = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <Box sx={{ maxWidth: 800, p: 3 }}>
      <Typography
        marginTop={2}
        variant="h4"
        component="h2"
        sx={{ fontWeight: 600, mb: 3, color: "#111" }}
      >
        Blogs
      </Typography>
      <ul>
        {blogsSorted.map((blog) => (
          <li key={blog.id} style={{ marginBottom: "10px" }}>
            <Link to={`/blogs/${blog.id}`}>
              <Typography
                variant="h6"
                component="span"
                sx={{
                  fontWeight: 500,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {blog.title}
              </Typography>
            </Link>
            <Typography
              variant="body1"
              component="span"
              color="text.secondary"
              sx={{ ml: 1 }}
            >
              by {blog.author}
            </Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default BlogList;
