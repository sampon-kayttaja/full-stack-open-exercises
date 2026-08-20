import { TextField, Button, Typography, Box } from "@mui/material";
import { useField } from "../hooks/index.js";

const CommentForm = ({ handleSubmit }) => {
  const comment = useField("text");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!comment.value.trim()) return;

    const success = await handleSubmit({ comment: comment.value });
    if (success) {
      comment.reset();
    }
  };

  const commentProps = {
    type: comment.type,
    value: comment.value,
    onChange: comment.onChange,
  };

  return (
    <Box style={{ marginTop: 20 }}>
      <form onSubmit={onSubmit}>
        <div>
          <TextField label="add a comment" {...commentProps} />
          <Button
            type="submit"
            variant="contained"
            style={{ marginLeft: 10, marginTop: 10 }}
          >
            add comment
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default CommentForm;
