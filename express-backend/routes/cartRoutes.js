const express = require('express');
const cartController = require('../controllers/cartCantroller');
const auth = require('../middleware/auth');
const router = express.Router({ mergeParams: true }); 

router.post('/addProduct', auth, cartController.addProductCartByUserId);
router.get('/getCart', auth, cartController.getCartByUserId)

module.exports = router;