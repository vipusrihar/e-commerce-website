import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from '@mui/material';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 200 },
  { id: 'address', label: 'Address', minWidth: 150 },
  { id: 'createdAt', label: 'Created At', minWidth: 100 },
];

const rows = [
  { id: 1, name: 'Vipusa Sriharan', email: 'vipusa@example.com', address: 'Jaffna', createdAt: '2023-01-01' },
  { id: 2, name: 'Sankavy Balu', email: 'sanku@example.com', address: 'Jaffna', createdAt: '2023-01-02' },
  { id: 3, name: 'Thivani Thiruvarangan', email: 'thivani@example.com', address: 'Jaffna', createdAt: '2023-01-03' },
  { id: 4, name: 'Pavisha Sriharan', email: 'pavi@example.com', address: 'Jaffna', createdAt: '2023-01-04' },
];

const UsersPage = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography  align="center" gutterBottom variant="h4" sx={{ color: '#78350F' , fontWeight:'bold'}}>
        USERS
      </Typography>

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
              {rows.map((row, index) => (
                <TableRow
                  hover
                  key={row.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id}>{row[column.id]}</TableCell>
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
