import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import dayjs from 'dayjs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflow: 'auto',
};

function ProjectModal({ open, handleClose, students, advisors }) {
  const [formData, setFormData] = useState({
    name: '',
    student: {
      id: '',
      name: '',
      career: '',
    },
    advisor: {
      id: '',
      name: '',
    },
    realizationDate: null,
    releaseDate: null,
    type: '',
    grade: '',
    summary: '',
    reportFile: null,
    degreeCandidate: false,
    checklist: [],
  });

  const [newChecklistItem, setNewChecklistItem] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStudentChange = (event) => {
    const student = students.find((s) => s.id === event.target.value);
    setFormData((prev) => ({
      ...prev,
      student: {
        id: student.id,
        name: student.name,
        career: student.career,
      },
    }));
  };

  const handleAdvisorChange = (event) => {
    const advisor = advisors.find((a) => a.id === event.target.value);
    setFormData((prev) => ({
      ...prev,
      advisor: {
        id: advisor.id,
        name: advisor.name,
      },
    }));
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setFormData((prev) => ({
        ...prev,
        checklist: [...prev.checklist, newChecklistItem.trim()],
      }));
      setNewChecklistItem('');
    }
  };

  const handleRemoveChecklistItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      checklist: prev.checklist.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={style}>
          <Typography variant="h6" id="modal-title" gutterBottom>
            New Project
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Project Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />

            <FormControl fullWidth margin="normal" required>
              <InputLabel>Student</InputLabel>
              <Select
                value={formData.student.id}
                onChange={handleStudentChange}
              >
                {students?.map((student) => (
                  <MenuItem key={student.id} value={student.id}>
                    {student.name} - {student.career}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" required>
              <InputLabel>Advisor</InputLabel>
              <Select
                value={formData.advisor.id}
                onChange={handleAdvisorChange}
              >
                {advisors?.map((advisor) => (
                  <MenuItem key={advisor.id} value={advisor.id}>
                    {advisor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <DatePicker
              label="Realization Date"
              value={formData.realizationDate}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, realizationDate: date }))
              }
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" required />
              )}
            />

            <DatePicker
              label="Release Date"
              value={formData.releaseDate}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, releaseDate: date }))
              }
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" required />
              )}
            />

            <TextField
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="Grade"
              name="grade"
              type="number"
              value={formData.grade}
              onChange={handleChange}
              inputProps={{ min: 0, max: 100 }}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="Summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              type="file"
              label="Report File"
              name="reportFile"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  reportFile: e.target.files[0],
                }))
              }
              fullWidth
              margin="normal"
              required
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.degreeCandidate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      degreeCandidate: e.target.checked,
                    }))
                  }
                />
              }
              label="Degree Candidate"
            />

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Checklist</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  value={newChecklistItem}
                  onChange={(e) => setNewChecklistItem(e.target.value)}
                  placeholder="Add checklist item"
                  fullWidth
                />
                <IconButton onClick={handleAddChecklistItem}>
                  <AddIcon />
                </IconButton>
              </Box>
              <List>
                {formData.checklist.map((item, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton
                        onClick={() => handleRemoveChecklistItem(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Create Project
            </Button>
          </form>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
}

export default ProjectModal;
