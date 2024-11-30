import Project from '../models/project.model.js';
import User from '../models/user.model.js';

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

// Create new project
export const createProject = async (req, res) => {
  const {
    name,
    student,
    advisor,
    realizationDate,
    releaseDate,
    type,
    grade,
    summary,
    reportFile,
    degreeCandidate,
    checklist,
  } = req.body;

  try {
    // Verify student role
    const studentData = await User.findById(student.id);
    if (!studentData || studentData.role !== 'alumno') {
      return res
        .status(400)
        .json({ message: 'Student must have role "alumno"' });
    }

    // Verify advisor role
    const advisorData = await User.findById(advisor.id);
    if (!advisorData || advisorData.role !== 'docente') {
      return res
        .status(400)
        .json({ message: 'Advisor must have role "docente"' });
    }

    const newProject = new Project({
      name,
      student: {
        id: student.id,
        name: student.name,
        career: student.career,
      },
      advisor: {
        id: advisor.id,
        name: advisor.name,
      },
      realizationDate,
      releaseDate,
      type,
      grade,
      summary,
      reportFile,
      degreeCandidate,
      checklist,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating project', error: error.message });
  }
};

// Get project by ID
export const getProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id).populate(
      'student.id advisor.id',
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ project });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching project', error: error.message });
  }
};

// Update project by ID
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    student,
    realizationDate,
    releaseDate,
    type,
    grade,
    summary,
    reportFile,
    degreeCandidate,
    checklist,
  } = req.body;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.student.id.role !== 'alumno') {
      return res
        .status(400)
        .json({ message: 'Student must have role "alumno"' });
    }

    if (project.advisor.id.role !== 'docente') {
      return res
        .status(400)
        .json({ message: 'Advisor must have role "docente"' });
    }

    Object.assign(project, {
      name: name || project.name,
      student: student || project.student,
      realizationDate: realizationDate || project.realizationDate,
      releaseDate: releaseDate || project.releaseDate,
      type: type || project.type,
      grade: grade || project.grade,
      summary: summary || project.summary,
      reportFile: reportFile || project.reportFile,
      degreeCandidate: degreeCandidate || project.degreeCandidate,
      checklist: checklist || project.checklist,
    });

    const updatedProject = await project.save();
    res.status(200).json({
      message: 'Project updated successfully',
      project: updatedProject,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating project', error: error.message });
  }
};

// Delete project by ID
export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting project', error: error.message });
  }
};
