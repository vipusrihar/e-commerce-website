import express from 'express'; 
import cartController from '../controllers/cartController.js';
import { userAuth } from '../middleware/auth.js';


const router = express.Router({ mergeParams: true });

router.post('/addProduct', userAuth, cartController.addProductCartByUserId);
router.get('/getCart', userAuth, cartController.getCartByUserId);
router.put('/clear', userAuth, cartController.clearAllProductsOfCart);

export default router;
