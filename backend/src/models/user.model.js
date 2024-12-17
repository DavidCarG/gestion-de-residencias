import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    enum: ["jefe_academico", "profesor", "presidente_academia", "coordinador_carrera", "estudiante"],
    required: true 
  },
  permissions: { type: [String], default: [] },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
