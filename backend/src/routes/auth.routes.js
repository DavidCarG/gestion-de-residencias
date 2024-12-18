import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', authRequired, logout);

export default router;
