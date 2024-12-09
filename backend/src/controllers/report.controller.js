import Report from '../models/report.model.js'; // Assuming the schema file is in models folder
import mongoose from 'mongoose';

// Create a new report
export const createReport = async (req, res) => {
  const { projectId, userId, link } = req.body;

  try {
    const newReport = new Report({
      projectId,
      userId,
      link
    });

    await newReport.save();
    res.status(201).json({ message: 'Report created successfully', report: newReport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating report' });
  }
};

// Get all reports
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('projectId', 'name') // Populate project name
      .populate('userId', 'name email'); // Populate user details
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching reports' });
  }
};

// Get reports by projectId
export const getReportsByProjectId = async (req, res) => {
  const { projectId } = req.params;

  try {
    const reports = await Report.find({ projectId })
      .populate('userId', 'name email');
    if (reports.length === 0) {
      return res.status(404).json({ message: 'No reports found for this project' });
    }
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching reports for the project' });
  }
};

// Get a single report by reportId
export const getReportById = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await Report.findById(id)
      .populate('projectId', 'name')
      .populate('userId', 'name email');
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching the report' });
  }
};

// Update a report
export const updateReport = async (req, res) => {
  const { id } = req.params;
  const { projectId, userId, link } = req.body;

  try {
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Update report fields
    report.projectId = projectId || report.projectId;
    report.userId = userId || report.userId;
    report.link = link || report.link;

    await report.save();
    res.status(200).json({ message: 'Report updated successfully', report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating the report' });
  }
};

// Delete a report
export const deleteReport = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await Report.findByIdAndDelete(id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting the report' });
  }
};