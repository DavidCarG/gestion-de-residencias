import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from '../controllers/project.controller.js';
import { getReportsByProjectId } from '../controllers/report.controller.js';


const router = Router();

router.post('/projects', createProject);
router.get('/projects/:id', getProjectById);
router.get('/projects', getProjects);
router.get('/projects/:projectId/reports', getReportsByProjectId);
router.patch('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);



// router.get('/projects/:id', getProject);
// router.post('/projects', createProject);
// router.delete('/projects/:id', deleteProject);
// router.put('/projects/:id', updateProject);

export default router;
