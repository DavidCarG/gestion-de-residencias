import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getProjectBanks,
  getProjectBank,
  deleteProjectBank,
  updateProjectBank,
  createProjectBank,
} from '../controllers/projectBank.controller.js';

import { validateSchema } from '../middlewares/validator.middleware.js';
import { createProjectBankSchema } from '../schemas/projectBank.schema.js';

const router = Router();

router.get('/projectBanks', authRequired, getProjectBanks);
router.get('/projectBanks/:id', authRequired, getProjectBank);
router.post(
  '/projectBanks',
  authRequired,
  validateSchema(createProjectBankSchema),
  createProjectBank,
);
router.delete('/projectBanks/:id', authRequired, deleteProjectBank);
router.put('/projectBanks/:id', authRequired, updateProjectBank);

export default router;
