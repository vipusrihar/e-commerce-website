import { Router } from 'express';
const router = Router();
import { findAllUsers, findUserById, findUserByEmail, updateUser, deleteUser } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

router.get('/', auth, findAllUsers);
router.get('/:id', auth, findUserById);
router.get('/email/:email',auth,findUserByEmail);
router.put('/:id',auth, updateUser);
router.delete('/:id', auth, deleteUser);


export default router;
