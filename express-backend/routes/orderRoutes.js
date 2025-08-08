import express from 'express';
import { Router } from 'express';
const router = Router();
import orderController from '../controllers/orderController.js';
import { adminAuth, adminOrUserAuth, auth, userAuth } from '../middleware/auth.js';


router.post('/', userAuth, orderController.createOrder);
router.get('/count', adminAuth, orderController.countOrders)
router.get('/:id', adminOrUserAuth, orderController.findOrderById);
router.get('/', adminAuth, orderController.findAllOrders);
router.get('/user/:userId', adminOrUserAuth, orderController.findOrdersByUser);
router.put('/:id', adminAuth, orderController.updateOrderStatus);
router.delete('/:id', adminOrUserAuth, orderController.deleteOrder);



export default router;