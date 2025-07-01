import { Router } from 'express';
import bookController from '../controllers/bookController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/', auth, bookController.createBook);
router.get('/ISBN/:isbn', auth, bookController.findBookByISBN); 
router.get('/:hashid', bookController.findBookById);
router.put('/:hashid', auth, bookController.updateBook);
router.delete('/:hashid', auth, bookController.deleteBook);
router.get('/', bookController.findAllBooks);

export default router;
