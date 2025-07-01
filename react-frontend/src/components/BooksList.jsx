import React, { useEffect, } from 'react';
import {
  Box,
  Chip,
  Grid,
  Paper,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks, getBookById } from '../state/book/Action';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  position: 'relative',
}));

const ImageContainer = styled(Box)({
  position: 'relative',
  borderRadius: '8px',
  overflow: 'hidden',
  '&:hover .overlay': {
    opacity: 1,
  },
});

const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
  zIndex: 2,
});

const BooksList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books) || [];
  const navigation = useNavigate();

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#78350F' }}
      >
        Books
      </Typography>

      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Grid container spacing={4}>
          {books.map((book) => (
            <Grid size={3} key={book._id}>
              <Item>
                <ImageContainer>
                  <Chip
                    label={`Rs. ${book.price}`}
                    variant="outlined"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      fontWeight: 'bold',
                      backgroundColor: 'yellow',
                      color: '#78350F',
                      zIndex: 3,
                    }}
                  />

                  <Box
                    component="img"
                    src={book.image}
                    alt={book.title}
                    sx={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                    }}
                  />

                  <Overlay className="overlay">
                    <Tooltip title="View">
                      <IconButton sx={{ color: '#fff', backgroundColor: '#00000088' }}
                        onClick={() => {
                          dispatch(getBookById(book.hashid));
                          console.log(book);
                          navigation(`/book/${book.hashid}`);

                        }}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Add to Cart">
                      <IconButton sx={{ color: '#fff', backgroundColor: '#00000088' }}>
                        <ShoppingCartIcon />
                      </IconButton>
                    </Tooltip>
                  </Overlay>


                </ImageContainer>

                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                  {book.title}
                </Typography>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default BooksList;
