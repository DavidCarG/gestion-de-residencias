import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
  createProjects,
} from '../controllers/project.controller.js';
import { getReportsByProjectId } from '../controllers/report.controller.js';

const router = Router();

router.post('/projects', createProject);
router.post('/projects/bulk', createProjects);
router.get('/projects/:id', getProjectById);
router.get('/projects', getProjects);
router.get('/projects/:projectId/reports', getReportsByProjectId);
router.patch('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

export default router;
