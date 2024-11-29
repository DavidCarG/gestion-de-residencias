import Project from '../models/project.model.js';

export const getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

export const createProject = async (req, res) => {
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
    const studentData = await User.findById(student.id);
    if (!studentData) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }

    const newProject = new Project({
      name,
      student: {
        id: student.id,
        name: student.name,
        career: student.career,
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

    const savedProject = await newProject.save();

    res.status(201).json({
      message: 'Proyecto de residencia creado exitosamente',
      project: savedProject,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al crear el proyecto', error: error.message });
  }
};

export const getProject = async (req, res) => {
  const { id } = req.params; // Obtenemos el ID del proyecto de los parámetros de la URL

  try {
    // Buscar el proyecto por ID
    const project = await Project.findById(id).populate(
      'student.id advisor.id',
    ); // Usamos populate para traer los datos completos de los referenciados

    // Verificar si el proyecto existe
    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    // Responder con el proyecto encontrado
    res.status(200).json({ project });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener el proyecto', error: error.message });
  }
};

// **2. Actualizar un proyecto**
export const updateProject = async (req, res) => {
  const { id } = req.params; // Obtenemos el ID del proyecto de los parámetros de la URL
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
    // Buscar el proyecto por ID
    const project = await Project.findById(id);

    // Verificar si el proyecto existe
    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    // Actualizar el proyecto con los nuevos datos
    project.name = name || project.name;
    project.student = student || project.student; // Puede ser un objeto con { id, name, career }
    project.realizationDate = realizationDate || project.realizationDate;
    project.releaseDate = releaseDate || project.releaseDate;
    project.type = type || project.type;
    project.grade = grade || project.grade;
    project.summary = summary || project.summary;
    project.reportFile = reportFile || project.reportFile;
    project.degreeCandidate = degreeCandidate || project.degreeCandidate;
    project.checklist = checklist || project.checklist;

    // Guardar los cambios
    const updatedProject = await project.save();

    // Responder con el proyecto actualizado
    res.status(200).json({
      message: 'Proyecto actualizado exitosamente',
      project: updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar el proyecto',
      error: error.message,
    });
  }
};

// **3. Eliminar un proyecto**
export const deleteProject = async (req, res) => {
  const { id } = req.params; // Obtenemos el ID del proyecto de los parámetros de la URL

  try {
    // Buscar el proyecto por ID y eliminarlo
    const project = await Project.findByIdAndDelete(id);

    // Verificar si el proyecto fue encontrado y eliminado
    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    // Responder confirmando que el proyecto fue eliminado
    res.status(200).json({ message: 'Proyecto eliminado exitosamente' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al eliminar el proyecto', error: error.message });
  }
};
