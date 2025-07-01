// just create for now will be develop later

import express from 'express';
import { Router } from 'express';
const router = Router();
import paymentController from '../controllers/paymentController.js';
import auth from '../middleware/auth.js';

router.post('/',auth,paymentController.createPayment);
router.get('/payment/:id',auth,paymentController.getPaymentById);
// router.delete('/:id',auth,paymentController.deletePayment);
router.put('/:userId/status',auth,paymentController.updatePaymentStatus);
router.get('/order/:orderId',auth,paymentController.getPaymentsByOrderId);

export default  router;