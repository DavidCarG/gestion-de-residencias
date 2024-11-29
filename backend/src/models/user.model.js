import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }, // Encriptado
    role: {
      type: String,
      enum: [
        'docente',
        'alumno',
        'jefe academico',
        'presidente de academia',
        'coordinador de carrera',
      ],
      required: true,
    },
    career: { type: String }, // Solo para "alumno" o "docente"
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', userSchema);
