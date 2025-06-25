const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');


router.post('/',auth,orderController.createOrder);
router.get('/:id',auth,orderController.findOrderById);
router.get('/',auth,orderController.findAllOrders);
router.get('/user/:userId',auth,orderController.findOrdersByUser);
router.put('/:id',auth,orderController.updateOrderStatus);
router.delete('/:id',auth,orderController.deleteOrder);


module.exports = router;