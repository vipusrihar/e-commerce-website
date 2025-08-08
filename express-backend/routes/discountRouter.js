import express from 'express';
import discountCountroller from '../controllers/discountCountroller.js';
import { adminAuth, auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/createDiscount', adminAuth(), discountCountroller.createDiscount);
router.get('/getAllDiscounts', auth(), discountCountroller.getAllDiscounts);
router.get('/byBook/:bookId', auth(), discountCountroller.findDiscountByBookId);
router.put('/editDiscount/:id', adminAuth(), discountCountroller.editDiscount);
router.put('/updateStatus/:id', adminAuth(), discountCountroller.updateDiscountStatusById);
router.delete('/:id', adminAuth(), discountCountroller.deleteDiscount);
router.get('/count', adminAuth(), discountCountroller.countActiveDiscount)


export default router;