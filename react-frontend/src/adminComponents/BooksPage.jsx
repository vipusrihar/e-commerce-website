import React, { useState } from 'react';
import {  Paper,  Table,  TableBody,  TableCell,  TableContainer,
  TableHead,  TableRow,  Box,  Typography,  Button,  Modal,} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddBookForm from './AddBookForm';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'title', label: 'Title', minWidth: 150 },
  { id: 'author', label: 'Author', minWidth: 120 },
];

const rows = [
  { id: 1, title: 'Book A', author: 'Author X' },
  { id: 2, title: 'Book B', author: 'Author Y' },
  { id: 3, title: 'Book C', author: 'Author Z' },
  { id: 4, title: 'Book D', author: 'Author X' },
];


const BooksPage = () => {
const [open, setOpen] = useState(false); 

  const handleAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 1,
        }}
      >
        <Typography gutterBottom variant="h4" sx={{ color: '#78350F' , fontWeight:'bold'}}>
          BOOKS
        </Typography>
        <Button onClick={ () => handleAdd()}>
          <AddIcon sx={{ width: '40px', height: '40px',  color: '#78350F'}}  />
        </Button>
      </Box>

       <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <AddBookForm onClose={handleClose} />
        </Box>
      </Modal>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table stickyHeader aria-label="table without pagination">
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
                  tabIndex={-1}
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

export default BooksPage;
