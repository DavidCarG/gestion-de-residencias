import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { loginSchema, registerSchema } from '../models/auth.schema.js';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/user.controller.js';

const router = Router();

router.post('/users', createUser);
router.get('/users/:id', getUserById);
router.get('/users', getUsers);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// router.post('/register', validateSchema(registerSchema), register);
// router.post('/login', validateSchema(loginSchema), login);
// router.post('/logout', logout);
// router.get('/profile', authRequired, profile);

export default router;