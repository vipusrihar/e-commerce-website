// just create for now will be develop later

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');

router.post('/',auth,paymentController.createPayment);
router.get('/payment/:id',auth,paymentController.getPaymentById);
// router.delete('/:id',auth,paymentController.deletePayment);
router.put('/:userId/status',auth,paymentController.updatePaymentStatus);
router.get('/order/:orderId',auth,paymentController.getPaymentsByOrderId);

module.exports = router;