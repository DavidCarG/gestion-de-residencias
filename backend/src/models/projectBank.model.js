const mongoose = require('mongoose');

const projectBankSchema = new mongoose.Schema({
  nombreProyecto: {
    type: String,
    required: true,
  },
  empresaSolicitante: {
    type: String,
    required: true,
  },
  año: {
    type: Number,
    required: true,
  },
  semestre: {
    type: String,
    required: true,
  },
  nombreEncargado: {
    type: String,
    required: true,
  },
  correoElectronico: {
    type: String,
    required: true,
  },
  telefonoContacto: {
    type: String,
    required: true,
  },
  ubicacion: {
    type: String,
    required: true,
  },
  descripcionBreve: {
    type: String,
    required: true,
  },
  descripcionPDF: {
    type: Buffer,
  },
});

export default mongoose.model('ProjectBank', projectBankSchema);
