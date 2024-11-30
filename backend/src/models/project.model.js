import User from './user.model.js';

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    student: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
          validator: async function (value) {
            const studentData = await User.findById(value);
            return studentData && studentData.role === 'alumno'; // Validar rol
          },
          message: 'El estudiante debe tener el rol de "alumno".',
        },
      },
      name: { type: String, required: true },
      career: { type: String, required: true },
    },
    advisor: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
          validator: async function (value) {
            const advisorData = await User.findById(value);
            return advisorData && advisorData.role === 'docente'; // Validar rol
          },
          message: 'El asesor debe tener el rol de "docente".',
        },
      },
      name: { type: String, required: true },
    },
    realizationDate: { type: Date, required: true },
    releaseDate: { type: Date, required: true },
    type: { type: String, required: true },
    grade: { type: Number, min: 0, max: 100, required: true },
    summary: { type: String, required: true },
    reportFile: { type: String, required: true },
    degreeCandidate: { type: Boolean, default: false },
    checklist: { type: [String], default: [] },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Project', projectSchema);
