import { Box, Chip, Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddToCartModal from './AddToCartModal';
import { useDispatch, useSelector } from 'react-redux';
import { getBookById } from '../state/book/Action';
import { useNavigate } from 'react-router-dom';
import { addCartItem } from '../state/cart/Action';

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


const SingleBook = ({ book }) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.selectedUser?.id) || null;

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const navigation = useNavigate()

    const handleViewBook = (hashid) => {
        dispatch(getBookById(hashid));
        navigation(`/book/${hashid}`);
    }

    const handleAddToCart = (book) => {
        setSelectedBook(book);
        setQuantity(1);
        setModalOpen(true);
    };

    const handleConfirmAddToCart = () => {
        dispatch(addCartItem(selectedBook._id, quantity, userId));
        alert("Item added to cart successfully!");
        setModalOpen(false);
    };

    return (
        <>
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
                            <Tooltip title="View Book">
                                <IconButton
                                    sx={{ color: '#fff', backgroundColor: '#00000088' }}
                                    aria-label="View Book"
                                    onClick={() => handleViewBook(book.hashid)}>
                                    <VisibilityIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Add to Cart">
                                <IconButton
                                    sx={{ color: '#fff', backgroundColor: '#00000088' }}
                                    aria-label="Add to Cart"
                                    onClick={() => handleAddToCart(book)}>
                                    <ShoppingCartIcon />
                                </IconButton>
                            </Tooltip>
                        </Overlay>


                    </ImageContainer>

                    <Typography variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            mt: 2,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                        {book.title}
                    </Typography>

                </Item>
            </Grid>

            {
                userId && selectedBook && (

                    <AddToCartModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        book={selectedBook}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        onConfirm={handleConfirmAddToCart}
                    />
                )
            }

        </>
    )
}

export default SingleBook
