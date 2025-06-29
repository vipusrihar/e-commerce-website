import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Stack,
} from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';

const columns = [
  { id: 'reviewId', label: 'Review ID', minWidth: 80 },
  { id: 'bookTitle', label: 'Book Title', minWidth: 150 },
  { id: 'user', label: 'User', minWidth: 120 },
  { id: 'rating', label: 'Rating', minWidth: 100 },
  { id: 'comment', label: 'Comment', minWidth: 200 },
];

const rows = [
  { reviewId: 'R001', bookTitle: 'Book A', user: 'Alice', rating: 5, comment: 'Excellent book!' },
  { reviewId: 'R002', bookTitle: 'Book B', user: 'Bob', rating: 3, comment: 'It was okay.' },
  { reviewId: 'R003', bookTitle: 'Book C', user: 'Charlie', rating: 4, comment: 'Nice read.' },
  { reviewId: 'R004', bookTitle: 'Book A', user: 'Diana', rating: 2, comment: 'Not my type.' },
  { reviewId: 'R005', bookTitle: 'Book D', user: 'Ethan', rating: 5, comment: 'Loved every page!' },
];

const ReviewsPage = () => {
  const [bookFilter, setBookFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  const filteredRows = rows.filter((row) => {
    const matchesBook = bookFilter ? row.bookTitle === bookFilter : true;
    const matchesRating = ratingFilter ? row.rating === parseInt(ratingFilter) : true;
    return matchesBook && matchesRating;
  });

  const uniqueBooks = [...new Set(rows.map((r) => r.bookTitle))];

  return (
    <Box p={3}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#78350F' }}
      >
        Book Reviews
      </Typography>

      {/* Filters */}
      <Stack direction="row" spacing={2} mb={2}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Book</InputLabel>
          <Select
            value={bookFilter}
            label="Filter by Book"
            onChange={(e) => setBookFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {uniqueBooks.map((book) => (
              <MenuItem key={book} value={book}>
                {book}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Rating</InputLabel>
          <Select
            value={ratingFilter}
            label="Filter by Rating"
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {[5, 4, 3, 2, 1].map((rating) => (
              <MenuItem key={rating} value={rating}>
                {rating} Stars
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      minWidth: column.minWidth,
                      backgroundColor: '#FCD34D',
                      color: '#78350F',
                      fontWeight: 'bold',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows.map((row, index) => (
                <TableRow
                  key={row.reviewId}
                  hover
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#FAFAFA' : 'white',
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.id === 'rating' ? (
                        [...Array(5)].map((_, i) =>
                          i < row.rating ? (
                            <StarIcon key={i} sx={{ color: '#FBBF24', fontSize: 20 }} />
                          ) : (
                            <StarOutlineIcon key={i} sx={{ color: '#E0E0E0', fontSize: 20 }} />
                          )
                        )
                      ) : (
                        row[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {filteredRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No reviews found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ReviewsPage;
