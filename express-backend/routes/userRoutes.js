import { Router } from 'express';
const router = Router();
import { findAllUsers, findUserById, findUserByEmail, updateUser, deleteUser, countUsers } from '../controllers/userController.js';
import { adminAuth, adminOrUserAuth, userAuth } from '../middleware/auth.js';

router.get('/count', adminAuth, countUsers);
router.get('/email/:email', adminOrUserAuth, findUserByEmail);
router.get('/', adminAuth, findAllUsers);
router.get('/:id', adminOrUserAuth, findUserById);
router.put('/:id', adminOrUserAuth, updateUser);
router.delete('/:id', userAuth, deleteUser);


export default router;
