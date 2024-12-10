import { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
// Date picker stuff
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
//--
import PropTypes from 'prop-types';
import { createProject } from '../../api/projects';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '80vh',
  overflowY: 'auto',
};

function ProjectModal({ open, handleClose }) {
  const [formData, setFormData] = useState({
    name: '',
    requestingCompany: '',
    semester: '',
    advisor: '',
    advisorMail: '',
    advisorContactPhone: '',
    assigned: false,
    city: '',
    state: '',
    career: '',
    summary: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      releaseDate: date,
    }));
  };

  const handleSubmit = (event) => {
    createProject(formData);

    event.preventDefault();
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <h2 id="modal-title">Nuevo Proyecto</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            name="name"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Empresa"
            name="requestingCompany"
            value={formData.requestingCompany}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Periodo</InputLabel>
            <Select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
            >
              <MenuItem value="spring">Primavera</MenuItem>
              <MenuItem value="fall">Otoño</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Encargado"
            name="advisor"
            value={formData.advisor}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Correo del encargado"
            name="advisorMail"
            type="email"
            value={formData.advisorMail}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Estado"
            name="state"
            value={formData.state}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Ciudad"
            name="city"
            value={formData.city}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Carrera</InputLabel>
            <Select
              name="career"
              value={formData.career}
              onChange={handleChange}
            >
              <MenuItem value="sistemas_computacionales">
                Sistemas Computacionales
              </MenuItem>
              <MenuItem value="mecatronica">Mecatrónica</MenuItem>
              <MenuItem value="electrica">Eléctrica</MenuItem>
              <MenuItem value="metal_mecanica">Metal Mecánica</MenuItem>
              <MenuItem value="industrial">Industrial</MenuItem>
              <MenuItem value="energias_renovables">
                Energías Renovables
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Descripción"
            multiline
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

ProjectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ProjectModal;
