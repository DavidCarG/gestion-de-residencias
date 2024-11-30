import Report from '../models/report.model.js';

// Get all reports
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('author');
    res.status(200).json(reports);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching reports', error: error.message });
  }
};

// Get single report
export const getReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate('author');
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching report', error: error.message });
  }
};

// Create new report
export const createReport = async (req, res) => {
  try {
    const newReport = new Report(req.body);
    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating report', error: error.message });
  }
};

// Update report
export const updateReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating report', error: error.message });
  }
};

// Delete report
export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting report', error: error.message });
  }
};
