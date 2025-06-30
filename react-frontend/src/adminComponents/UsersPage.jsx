import React, { useEffect, useState } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Box, Typography, TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../state/user/Action';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 200 },
  { id: 'address', label: 'Address', minWidth: 150 },
  { id: 'createdAt', label: 'Created At', minWidth: 100 },
];

const UsersPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users || []);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Filter users by name, email, or address
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
    user.address?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        align="center"
        gutterBottom
        variant="h4"
        sx={{ color: '#78350F', fontWeight: 'bold' }}
      >
        USERS
      </Typography>

      <TextField
        label="Search by Name, Email or Address"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="users table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#FCD34D' }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      minWidth: column.minWidth,
                      fontWeight: 'bold',
                      color: '#78350F',
                      backgroundColor: '#FCD34D',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow
                  hover
                  key={user._id || user.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {user[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default UsersPage;
