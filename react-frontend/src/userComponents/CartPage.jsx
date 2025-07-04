import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, getCartByUserId } from '../state/cart/Action';
import {
  Box, Typography, Button,
  Table, TableHead, TableRow, TableCell, TableBody, Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.selectedUser);
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    if (user && user.id) {
      dispatch(getCartByUserId(user.id));
    }
  }, [dispatch, user]);

  const cartTotal = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.book.price * item.quantity, 0)
    : 0;


  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    // Add your order creation logic here
  };

  return (
    <Box sx={{ p: 3 }}>

      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Box>
          <Typography>Your cart is empty.</Typography>
        </Box>
      ) : (
        <Paper elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#FCD34D' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Price per Item (Rs)</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Total (Rs)</TableCell>
                <TableCell sx={{ maxWidth: 10 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.book.title}</TableCell>
                  <TableCell>
                    <Button onClick={() => dispatch(addCartItem(item.book.id, -1, user.id))}>
                      <RemoveTwoToneIcon sx={{ width: 15, height: 15 }} />
                    </Button>
                    {item.quantity}
                    <Button onClick={() => dispatch(addCartItem(item.book.id, 1, user.id))}>
                      <AddTwoToneIcon sx={{ width: 15, height: 15 }} />
                    </Button>
                  </TableCell>
                  <TableCell>{item.book.price.toFixed(2)}</TableCell>
                  <TableCell>{(item.book.price * item.quantity).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button onClick={() => dispatch(addCartItem(item.book.id, -item.quantity, user.id))}>
                      <CloseIcon sx={{ color: 'red' }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} sx={{ fontWeight: 'bold' }}>Cart Total</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{cartTotal.toFixed(2)} Rs</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      )}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant='contained' >Back To Search</Button>

        {cartItems.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CartPage;
