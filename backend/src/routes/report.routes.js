import express from 'express';
import {
  getReports,
  getReport,
  createReport,
  updateReport,
  deleteReport,
} from '../controllers/report.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = express.Router();

// GET /api/reports - Get all reports
router.get('/report', authRequired, getReports);

// GET /api/reports/:id - Get single report
router.get('/report/:id', authRequired, getReport);

// POST /api/reports - Create new report
router.post('/report/', authRequired, createReport);

// PUT /api/reports/:id - Update report
router.put('/report/:id', authRequired, updateReport);

// DELETE /api/reports/:id - Delete report
router.delete('/report/:id', authRequired, deleteReport);

export default router;
