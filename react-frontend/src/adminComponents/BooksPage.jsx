import React, { useEffect, useState } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Box, Typography, Button, Modal,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddBookForm from './AddBookForm';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks } from '../state/book/Action';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'title', label: 'Title', minWidth: 150 },
  { id: 'author', label: 'Author', minWidth: 120 },
  { id: 'description', label: 'Description' },
];

const BooksPage = () => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const books = useSelector((state) => state.books.books || []);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  const handleAdd = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddBook = (newBook) => {
    setBooks([...books, { ...newBook, id: books.length + 1 }]); // Optional: not used in redux-based flow
    handleClose();
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchText.toLowerCase()) ||
    book.author.toLowerCase().includes(searchText.toLowerCase()) ||
    book.description?.toLowerCase().includes(searchText.toLowerCase())
  );

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
        <Typography gutterBottom variant="h4" sx={{ color: '#78350F', fontWeight: 'bold' }}>
          BOOKS
        </Typography>
        <Button onClick={handleAdd}>
          <AddIcon sx={{ width: '40px', height: '40px', color: '#78350F' }} />
        </Button>
      </Box>

      <TextField
        label="Search by Title, Author or Description"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll" }}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            scrollPaddingTop: 10,
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <AddBookForm onClose={handleClose} onSubmit={handleAddBook} />
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
              {filteredBooks.map((row, index) => (
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
