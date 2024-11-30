import ProjectBank from '../models/projectBank.model.js';

// Get all projects
export const getProjectBanks = async (req, res) => {
  try {
    const projects = await ProjectBank.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get project by ID
export const getProjectBank = async (req, res) => {
  try {
    const project = await ProjectBank.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new project
export const createProjectBank = async (req, res) => {
  try {
    const newProject = new ProjectBank(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update project by ID
export const updateProjectBank = async (req, res) => {
  try {
    const project = await ProjectBank.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete project by ID
export const deleteProjectBank = async (req, res) => {
  try {
    const project = await ProjectBank.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
