import express from 'express';
import discountCountroller from '../controllers/discountCountroller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/createDiscount',auth,discountCountroller.createDiscount);
router.get('/getAllDiscounts', auth, discountCountroller.getAllDiscounts);
router.get('/byBook/:bookId',auth,discountCountroller.findDiscountByBookId);
router.put('/editDiscount/:id', auth, discountCountroller.editDiscount);
router.put('/updateStatus/:id',auth,discountCountroller.updateDiscountStatusById);
router.delete('/:id', auth, discountCountroller.deleteDiscount);


export default router;