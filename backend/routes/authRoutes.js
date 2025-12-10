import express from 'express';
import {
    register,
    login,
    getMe,
    logout,
    getAllUsers,
    getUserById,
} from '../controllers/authController.js';
import { protect, admin } from '../middleware/auth.js';
import {
    registerValidation,
    loginValidation,
    validate,
} from '../middleware/validation.js';

const router = express.Router();

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.get('/users', protect, admin, getAllUsers);
router.get('/users/:id', protect, admin, getUserById);

export default router;