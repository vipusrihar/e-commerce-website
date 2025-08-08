import { Router } from 'express';
import bookController from '../controllers/bookController.js';
import { adminAuth, auth } from '../middleware/auth.js';

const router = Router();

router.post('/', adminAuth(), bookController.createBook);
router.get('/count', auth(), bookController.countBooks);
router.get('/ISBN/:isbn', auth(), bookController.findBookByISBN);
router.get('/', bookController.findAllBooks);
router.get('/:hashid', bookController.findBookById);
router.put('/:hashid', adminAuth(), bookController.updateBook);
router.delete('/:hashid', adminAuth(), bookController.deleteBook);


export default router;
