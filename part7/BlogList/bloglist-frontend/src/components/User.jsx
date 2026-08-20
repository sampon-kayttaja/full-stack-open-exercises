import { Typography, Box, Link } from "@mui/material";
import { useParams } from "react-router-dom";

const User = ({ users, blogs }) => {
  const { id } = useParams();
  const user = users.find((u) => u.id === id);

  if (!user) {
    return (
      <Box sx={{ mt: 2, p: 3 }}>
        <Typography variant="body1">Loading user details...</Typography>
      </Box>
    );
  }

  const userBlogs = user.blogs
    .map((blogId) =>
      typeof blogId === "object" ? blogId : blogs.find((b) => b.id === blogId),
    )
    .filter(Boolean);

  return (
    <Box
      sx={{
        mt: 1,
        p: 3,
        maxWidth: 480,
      }}
      className="user-details"
    >
      <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
        {user.name}
      </Typography>

      <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
        Added Blogs
      </Typography>

      <Box sx={{ mb: 1 }}>
        {user.blogs && user.blogs.length > 0 ? (
          <ul>
            {userBlogs.map((blog) => (
              <li key={blog.id} style={{ marginBottom: "10px" }}>
                <Link href={`/blogs/${blog.id}`} underline="hover">
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
              </li>
            ))}
          </ul>
        ) : (
          <Typography variant="body1" sx={{ fontStyle: "italic" }}>
            No blogs added by this user.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default User;
