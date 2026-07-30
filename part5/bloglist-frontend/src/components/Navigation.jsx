import { Link } from 'react-router-dom'

const Navigation = ({ user, logout }) => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <Link to="/">home</Link>  
    {user ? (
      <>
        <Link to="/addBlog">add blog</Link>
        <button onClick={logout}>logout</button>
      </>
    ) : (
      <Link to="/login">login</Link>
    
    )}
  </div>
)

export default Navigation