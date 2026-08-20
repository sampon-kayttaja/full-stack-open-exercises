import { TextField, Button, Typography, Box } from "@mui/material";
import { useField } from "../hooks/index.js";

const BlogForm = ({ handleSubmit }) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const onSubmit = async (event) => {
    event.preventDefault();

    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    try {
      await handleSubmit(blogObject);

      title.reset();
      author.reset();
      url.reset();
    } catch (error) {}
  };

  const titleProps = {
    type: title.type,
    value: title.value,
    onChange: title.onChange,
  };
  const authorProps = {
    type: author.type,
    value: author.value,
    onChange: author.onChange,
  };
  const urlProps = { type: url.type, value: url.value, onChange: url.onChange };

  return (
    <Box sx={{ maxWidth: 800, p: 3 }}>
      <Typography
        margginTop={2}
        variant="h4"
        component="h2"
        sx={{ fontWeight: 600, mb: 3, color: "#111" }}
      >
        Add Blog
      </Typography>
      <form onSubmit={onSubmit}>
        <div>
          <TextField label="title" {...titleProps} />
        </div>
        <div>
          <TextField
            style={{ marginTop: 10 }}
            label="author"
            {...authorProps}
          />
        </div>
        <div>
          <TextField style={{ marginTop: 10 }} label="url" {...urlProps} />
        </div>
        <div>
          <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
            add
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default BlogForm;
