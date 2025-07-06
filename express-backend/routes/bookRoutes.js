import { Router } from 'express';
import bookController  from '../controllers/bookController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/', auth, bookController.createBook);
router.get('/count', auth, bookController.countBooks);
router.get('/ISBN/:isbn', auth, bookController.findBookByISBN);
router.get('/', bookController.findAllBooks);
router.get('/:hashid', bookController.findBookById);
router.put('/:hashid', auth, bookController.updateBook);
router.delete('/:hashid', auth, bookController.deleteBook);


export default router;
