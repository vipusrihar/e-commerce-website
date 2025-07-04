import express from 'express';
import discountCountroller from '../controllers/discountCountroller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/createDiscount',auth,discountCountroller.createDiscount);
router.get('/getAllDiscounts', auth, discountCountroller.getAllDiscounts);
router.get('/byBook/:bookId',auth,discountCountroller.findDiscountByBookId);
router.post('/editDiscount/:id', auth, discountCountroller.editDiscount);
router.get('/updateStatus/:id',auth,discountCountroller.updateDiscountStatusById);


export default router;