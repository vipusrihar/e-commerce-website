import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from "@mui/material";
import { getOrdersByUserID } from "../state/order/Action";

const UsersOrderTable = () => {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.orders.orders);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth?.user?.id;

  useEffect(() => {
    if (userId) {
      dispatch(getOrdersByUserID(userId));
    }
  }, [dispatch, userId]);

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Order ID</strong></TableCell>
            <TableCell><strong>Items</strong></TableCell>
            <TableCell><strong>Total Price</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>

                <TableCell>
                  {
                    order.items.map((item) => (
                      
                      <div key={item._id}>
                        {item.book?.title || "Unknown Book"} (x{item.quantity})
                      </div>
                    
                    ))
                  }
                </TableCell>

                <TableCell>Rs. {order.totalPrice}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
                <TableCell>
                  {order.orderdAt.split("T")[0]}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No orders found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersOrderTable;
