import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartByUserId } from '../state/cart/Action';
import {
  Box, Typography, Button,
  Table, TableHead, TableRow, TableCell, TableBody, Paper
} from '@mui/material';

const CartPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.selectedUser);
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    if (user && user.id) {
      dispatch(getCartByUserId(user.id));
    }
  }, [dispatch, user]);

  const cartTotal = cartItems.reduce((total, item) => (
    total + item.book.price * item.quantity
  ), 0);

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
        <Typography>Your cart is empty.</Typography>
      ) : (
        <Paper elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#FCD34D' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Price per Item (Rs)</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Total (Rs)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.book.title}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.book.price.toFixed(2)}</TableCell>
                  <TableCell>{(item.book.price * item.quantity).toFixed(2)}</TableCell>
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

      {cartItems.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      )}
    </Box>
  );
};

export default CartPage;
