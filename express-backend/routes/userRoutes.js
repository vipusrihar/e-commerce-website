const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/', auth, userController.findAllUsers);
router.get('/:id', auth, userController.findUserById);
router.get('/email/:email',auth,userController.findUserByEmail);
router.put('/:id',auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);


module.exports = router;
