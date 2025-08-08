// just create for now will be develop later

import express from 'express';
import { Router } from 'express';
const router = Router();
import paymentController from '../controllers/paymentController.js';
import { adminOrUserAuth, userAuth } from '../middleware/auth.js';

router.post('/', userAuth(), paymentController.createPayment);
router.get('/payment/:id', adminOrUserAuth(), paymentController.getPaymentById);
// router.delete('/:id',auth,paymentController.deletePayment);
router.put('/:userId/status', adminOrUserAuth(), paymentController.updatePaymentStatus);
router.get('/order/:orderId', adminOrUserAuth(), paymentController.getPaymentsByOrderId);

export default router;