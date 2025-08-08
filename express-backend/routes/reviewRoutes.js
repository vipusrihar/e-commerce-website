import express from 'express';
import { Router } from 'express';
const router = Router();
import reviewController from '../controllers/reviewController.js';
import { adminOrUserAuth, auth, userAuth } from '../middleware/auth.js';


router.post('/', auth, reviewController.createReview);
router.get('/', adminOrUserAuth, reviewController.getAllReviews);
router.get('/book/:bookId', reviewController.getReviewsByBook);
router.get('/user/:userId', adminOrUserAuth, reviewController.getReviewsByUser);
router.put('/:id', userAuth, reviewController.updateReview);
router.delete('/:id', adminOrUserAuth, reviewController.deleteReview);

export default router;
