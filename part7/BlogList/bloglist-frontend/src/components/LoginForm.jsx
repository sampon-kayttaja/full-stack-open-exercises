import { TextField, Button, Box } from "@mui/material";
import { Typography } from "@mui/material";

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <Box sx={{ maxWidth: 800, p: 3 }}>
      <Typography
        margginTop={2}
        variant="h4"
        component="h2"
        sx={{ fontWeight: 600, mb: 3, color: "#111" }}
      >
        Login
      </Typography>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="username"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <TextField
              style={{ marginTop: 10 }}
              label="password"
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
              login
            </Button>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default LoginForm;
