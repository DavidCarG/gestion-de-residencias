import express from 'express';
import {
  getReports,
  createReport,
  updateReport,
  deleteReport,
  getReportById,
  getReportsByProjectId,
} from '../controllers/report.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = express.Router();

router.post('/reports', createReport);
router.get('/reports/:id', getReportById);
router.get('/reports', getReports);
router.patch('/reports/:id', updateReport);
router.delete('/reports/:id', deleteReport);

export default router;