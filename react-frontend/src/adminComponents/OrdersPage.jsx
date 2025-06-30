import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, Button, Menu, MenuItem
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../state/order/Action';

const columns = [
  { id: 'orderId', label: 'Order ID', minWidth: 100 },
  { id: 'user', label: 'User', minWidth: 150 },
  { id: 'date', label: 'Date', minWidth: 120 },
  { id: 'total', label: 'Total ($)', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 150 },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered': return 'success';
    case 'Pending': return 'warning';
    case 'Cancelled': return 'error';
    case 'Shipped': return 'info';
    default: return 'default';
  }
};

const OrdersPage = () => {
  const dispatch = useDispatch();
  const ordersFromStore = useSelector((store) => store.orders.orders);

  const [orders, setOrders] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (ordersFromStore) {
      setOrders(ordersFromStore);
    }
  }, [ordersFromStore]);

  const handleOpenMenu = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleChangeStatus = (newStatus) => {
    const updatedOrders = orders.map(order =>
      order.orderId === selectedOrderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    handleCloseMenu();
  };

  const statusOptions = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography align="center" gutterBottom variant="h4" sx={{ color: '#78350F', fontWeight: 'bold' }}>
        ORDERS
      </Typography>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table stickyHeader aria-label="orders table">
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
              {orders.map((row, index) => (
                <TableRow
                  hover
                  key={row.orderId}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                  }}
                >
                  <TableCell>{row.orderId}</TableCell>
                  <TableCell>{row.user}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip label={row.status} color={getStatusColor(row.status)} size="small" />
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={(e) => handleOpenMenu(e, row.orderId)}
                      >
                        Change
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {statusOptions.map((status) => (
          <MenuItem key={status} onClick={() => handleChangeStatus(status)}>
            {status}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default OrdersPage;
