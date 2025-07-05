import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getCartByUserId } from '../state/cart/Action';
import { getReviewsbyUserID } from '../state/review/Action';
import { getOrdersByUserID } from '../state/order/Action';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const auth = JSON.parse(localStorage.getItem('auth'));
  const userId = auth?.user?.id;

  const cartItems = useSelector((store) => store.cart.cartItems);
  const orders = useSelector((store) => store.orders.orders);
  const reviews = useSelector((store) => store.reviews.reviews);

  const currentOrderStatus = ''

  useEffect(() => {
    if (userId) {
      dispatch(getCartByUserId(userId));
      dispatch(getReviewsbyUserID(userId));
      dispatch(getOrdersByUserID(userId));
    }
  }, [dispatch, userId]);

  return (
    <Box sx={{ mx: 'auto', mt: 2, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Your Activity
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Current Order Status
        </Typography>
        <Typography>{currentOrderStatus}</Typography>
      </Paper>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        {/* Orders */}
        <Grid size={4}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Orders
            </Typography>
            <List dense>
              {orders?.length > 0 ? (
                orders.map((order, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Order ID: ${order._id}`}
                      secondary={`Status: ${order.status}`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2">No orders found.</Typography>
              )}
            </List>
          </Paper>
        </Grid>

        <Grid size={4}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Your Reviews
            </Typography>
            <List dense>
              {reviews?.length > 0 ? (
                reviews.map((review, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Book: ${review.book?.title || 'Unknown'}`}
                      secondary={`Comment: ${review.comment}`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2">No reviews yet.</Typography>
              )}
            </List>
          </Paper>
        </Grid>


        <Grid size={4}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Cart Items
            </Typography>
            <List dense>
              {cartItems?.length > 0 ? (
                cartItems.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={item.book?.title || 'Unknown Book'}
                      secondary={`Quantity: ${item.quantity}`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2">Your cart is empty.</Typography>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
