import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Nombre del proyecto
    student: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Relación con alumno
      name: { type: String, required: true },
      career: { type: String, required: true },
    },
    advisor: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Relación con docente
      name: { type: String, required: true },
    },
    realizationDate: { type: Date, required: true }, // Fecha de realización
    releaseDate: { type: Date, required: true }, // Fecha de liberación
    type: { type: String, required: true }, // Ejemplo: "desarrollo web"
    grade: { type: Number, min: 0, max: 100, required: true }, // Calificación
    summary: { type: String, required: true }, // Resumen del proyecto
    reportFile: { type: String, required: true }, // URL del informe en PDF
    degreeCandidate: { type: Boolean, default: false }, // Si es candidato a titulación
    checklist: { type: [String], default: [] }, // Elementos marcados por el asesor
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Project', projectSchema);
