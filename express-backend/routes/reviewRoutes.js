import express from 'express';
import { Router } from 'express'; 
const router = Router();
import reviewController from '../controllers/reviewController.js';
import auth from '../middleware/auth.js';   

router.post('/', auth, reviewController.createReview);
router.get('/', reviewController.getAllReviews);
router.get('/book/:bookId', reviewController.getReviewsByBook);
router.get('/user/:userId',auth,reviewController.getReviewsByUser);
router.put('/:id', auth, reviewController.updateReview);
router.delete('/:id', auth, reviewController.deleteReview);

export default  router;
