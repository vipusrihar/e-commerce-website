import { Router } from 'express';
const router = Router();
import { findAllUsers, findUserById, findUserByEmail, updateUser, deleteUser, countUsers } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

router.get('/count', auth, countUsers);
router.get('/email/:email', auth, findUserByEmail);
router.get('/', auth, findAllUsers);
router.get('/:id', auth, findUserById);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);


export default router;
