import express from 'express';
import { Router } from 'express';
const router = Router();
import orderController from '../controllers/orderController.js';
import auth from '../middleware/auth.js';


router.post('/',auth,orderController.createOrder);
router.get('/:id',auth,orderController.findOrderById);
router.get('/',auth,orderController.findAllOrders);
router.get('/user/:userId',auth,orderController.findOrdersByUser);
router.put('/:id',auth,orderController.updateOrderStatus);
router.delete('/:id',auth,orderController.deleteOrder);


export default  router;