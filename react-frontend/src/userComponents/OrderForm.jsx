import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const DELIVERY_CHARGE = 250;

const OrderForm = ({ user, cartItems, setOpen, onSubmit }) => {
    const discounts = useSelector((state) => state.discounts.discountsByBookId || {});

    const [phone, setPhone] = useState(user?.phone || '');
    const [address, setAddress] = useState(user?.address || '');
    const [paymentMethod, setPaymentMethod] = useState('');

    // Calculate subtotal applying discounts if available
    const subtotal = cartItems.reduce((total, item) => {
        const discountObj = discounts[item.book._id];
        const discount = discountObj ? discountObj.amount : 0;
        const discountedPrice = item.book.price * (1 - discount / 100);
        return total + discountedPrice * item.quantity;
    }, 0);

    const totalWithDelivery = subtotal + DELIVERY_CHARGE;

    const handleFinalOrder = () => {
        const orderDetails = {
            userId: user?.id,
            phone,
            address,
            paymentMethod,
            cartItems,
            subtotal,
            deliveryCharge: DELIVERY_CHARGE,
            total: totalWithDelivery
        };
        onSubmit(orderDetails);
        setOpen(false);
    };

    return (
        <Box sx={{
            width: 600,
            bgcolor: 'background.paper',
            p: 4,
            mx: 'auto',
            mt: 10,
            borderRadius: 2
        }}>
            <Typography variant="h6" gutterBottom>Confirm Your Order</Typography>

            <Typography variant="subtitle1">Books:</Typography>

            {cartItems.map((item, index) => {
                const discountObj = discounts[item.book._id];
                const discount = discountObj ? discountObj.amount : 0;
                const discountedPrice = item.book.price * (1 - discount / 100);
                return (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>{item.book.title} {discount > 0 && (
                            <span style={{ color: 'green' }}> (-{discount}% off)</span>
                        )} </Typography>
                        <Typography key={index}>

                            {discountedPrice} X {item.quantity}  = {item.quantity * discountedPrice}

                        </Typography>
                    </Box>
                );
            })}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography>Rs {subtotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Delivery Charge:</Typography>
                <Typography>Rs {DELIVERY_CHARGE.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, fontWeight: 'bold' }}>
                <Typography>Total:</Typography>
                <Typography>Rs {totalWithDelivery.toFixed(2)}</Typography>
            </Box>

            <TextField
                label="Phone Number"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ mt: 2 }}
            />

            <TextField
                label="Address"
                fullWidth
                multiline
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ mt: 2 }}
            />

            <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Payment Method</InputLabel>
                <Select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    label="Payment Method"
                >
                    <MenuItem value="cash">Cash on Delivery</MenuItem>
                    <MenuItem value="card">Card</MenuItem>
                    <MenuItem value="paypal">PayPal</MenuItem>
                </Select>
            </FormControl>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={handleFinalOrder}
                    disabled={!phone || !address || !paymentMethod}
                >
                    Confirm & Place Order
                </Button>
            </Box>
        </Box>
    );
};

export default OrderForm;
