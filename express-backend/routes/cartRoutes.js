import express from 'express'; 
import cartController from '../controllers/cartController.js';
import auth from '../middleware/auth.js';


const router = express.Router({ mergeParams: true });

router.post('/addProduct', auth, cartController.addProductCartByUserId);
router.get('/getCart', auth, cartController.getCartByUserId);
router.put('/clear', auth, cartController.clearAllProductsOfCart);

export default router;
