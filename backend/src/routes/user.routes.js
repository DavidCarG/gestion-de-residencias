import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  createUsers,
} from '../controllers/user.controller.js';

const router = Router();

router.post('/users', createUser);
router.post('/users/bulk', createUsers);
router.get('/users/:id', getUserById);
router.get('/users', getUsers);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
