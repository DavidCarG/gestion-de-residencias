import Report from '../models/report.model.js';
import Project from '../models/project.model.js';

export const createReport = async (req, res) => {
  const { projectId, userId, link } = req.body;

  try {
    const newReport = new Report({
      projectId,
      userId,
      link,
    });

    await newReport.save();

    await Project.findByIdAndUpdate(projectId, { $inc: { reportCount: 1 } });

    res
      .status(201)
      .json({ message: 'Report created successfully', report: newReport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating report' });
  }
};

export const createReports = async (req, res) => {
  try {
    const reports = await Report.insertMany(req.body);
    res.status(201).json(reports);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('projectId', 'projectName requestingCompany')
      .populate('userId', 'name email');
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching reports' });
  }
};

export const getReportsByProjectId = async (req, res) => {
  const { projectId } = req.params;

  try {
    const reports = await Report.find({ projectId }).populate(
      'userId',
      'name email',
    );
    if (reports.length === 0) {
      return res
        .status(404)
        .json({ message: 'No reports found for this project' });
    }
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching reports for the project' });
  }
};

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

export const updateReport = async (req, res) => {
  const { id } = req.params;
  const { projectId, userId, link } = req.body;

  try {
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

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
