import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material'
import App from '../App'

const Navigation = ({ user, logout }) => (
  <AppBar position='static'>
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Blog App
      </Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button color='inherit' component={Link} to="/">home</Button>
        {user ? (
          <>
            <Button color='inherit' component={Link} to="/addBlog">add blog</Button>
            <Button color='inherit' onClick={logout}>logout</Button>
          </>
        ) : (
          <Button color='inherit' component={Link} to="/login">login</Button>
        )}
      </Box>
    </Toolbar>
  </AppBar>
)

export default Navigation