import { TextField, Button } from "@mui/material"

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
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
        <div><Button type="submit" variant="contained" style={{ marginTop: 10 }}>login</Button></div>
      </form>
    </div>
  )
}

export default LoginForm