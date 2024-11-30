import ProjectBank from '../models/projectBank.model.js';

// Obtener todos los proyectos
export const getProjectBanks = async (req, res) => {
  try {
    const proyectos = await ProjectBank.find();
    res.status(200).json(proyectos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un proyecto por ID
export const getProjectBank = async (req, res) => {
  try {
    const proyecto = await ProjectBank.findById(req.params.id);
    if (!proyecto) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }
    res.status(200).json(proyecto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo proyecto
export const createProjectBank = async (req, res) => {
  try {
    const nuevoProyecto = new ProjectBank(req.body);
    await nuevoProyecto.save();
    res.status(201).json(nuevoProyecto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un proyecto por ID
export const updateProjectBank = async (req, res) => {
  try {
    const proyecto = await ProjectBank.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!proyecto) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }
    res.status(200).json(proyecto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un proyecto por ID
export const deleteProjectBank = async (req, res) => {
  try {
    const proyecto = await ProjectBank.findByIdAndDelete(req.params.id);
    if (!proyecto) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }
    res.status(200).json({ message: 'Proyecto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
