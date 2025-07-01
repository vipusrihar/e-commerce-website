import React, { useEffect } from 'react';
import { Box, Typography, Chip, Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getBookById } from '../state/book/Action';

const BookDetails = () => {
  const hashid = window.location.pathname.split('/').pop();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookById(hashid));
  }, [dispatch, hashid]);

  const book = useSelector((state) => state.books.selectedBook);

  if (!book) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Grid container spacing={4} alignItems="flex-start" sx={{ padding: 4 , border: 1, margin: 4}}>
      <Grid size={2}>
        <Box
          component="img"
          src={book.image}
          alt={book.title}
          sx={{
            width: '100%',
            height: 400,
            objectFit: 'cover',
            borderRadius: 2,
          }}
        />
      </Grid>

      <Grid size={10} >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {book.title}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          by {book.author}
        </Typography>

        <Chip
          label={`Rs. ${book.price}`}
          sx={{
            fontWeight: 'bold',
            mb: 2,
            color: '#78350F',
          }}
        />

        <Typography variant="body1" sx={{ mb: 3 }}>
          {book.description || 'No description available.'}
        </Typography>

        <Button variant="contained" color="primary">
          Add to Cart
        </Button>
      </Grid>
    </Grid>
    
    </>
  );
};

export default BookDetails;
