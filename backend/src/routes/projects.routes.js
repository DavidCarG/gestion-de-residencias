import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getProjects,
  getProject,
  deleteProject,
  updateProject,
  createProject,
} from '../controllers/project.controller.js';

import { validateSchema } from '../middlewares/validator.middleware.js';
import { createProjectSchema } from '../schemas/project.schema.js';

const router = Router();

router.get('/projects', authRequired, getProjects);
router.get('/projects/:id', authRequired, getProject);
router.post(
  '/projects',
  authRequired,
  validateSchema(createProjectSchema),
  createProject,
);
router.delete('/projects/:id', authRequired, deleteProject);
router.put('/projects/:id', authRequired, updateProject);

export default router;
