const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth');


router.post('/', auth, bookController.createBook);
router.get('/', auth, bookController.findAllBooks);
router.get('/:id', auth, bookController.findBookById);
router.get('/ISBN/:isbn', auth, bookController.findBookByISBN)
router.put('/:id', auth, bookController.updateBook);
router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;
