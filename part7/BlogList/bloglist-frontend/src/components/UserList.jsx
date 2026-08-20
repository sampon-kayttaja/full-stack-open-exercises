import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const UserList = ({ users }) => {
  return (
    <Box sx={{ maxWidth: 800, p: 3 }}>
      <Typography
        margginTop={2}
        variant="h4"
        component="h2"
        sx={{ fontWeight: 600, mb: 3, color: "#111" }}
      >
        Users
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 500 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Username
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                Blogs created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }} // Optional: removes border on the very last row
              >
                <TableCell sx={{ py: 2, fontSize: "0.95rem" }}>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell sx={{ py: 2, fontSize: "0.95rem" }}>
                  {user.username}
                </TableCell>
                <TableCell sx={{ py: 2, fontSize: "0.95rem" }}>
                  {user.blogs ? user.blogs.length : 0}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList;
