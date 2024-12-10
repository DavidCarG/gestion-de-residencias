import { useState } from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import { createReports } from '../../api/reports';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

function ReportModal({ open, handleClose }) {
    const [formData, setFormData] = useState({
        projectId: '',
        userId: '',
        link: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
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
                <h2 id="modal-title">Nuevo Reporte</h2>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Autor</InputLabel>
                        <Select
                            name="user"
                            value={formData.userId} // CHECAR LUEGO
                            onChange={handleChange}
                        >
                            <MenuItem value="carrera">Usuario 1</MenuItem>
                            <MenuItem value="carrera">Usuario 2</MenuItem>                            
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Empresa</InputLabel>
                        <Select
                            name="asignee"
                            value={formData.projectId} // REVIEW
                            onChange={handleChange}
                        >
                            <MenuItem value="carrera">John Deere</MenuItem>
                            <MenuItem value="carrera">Caterpillar</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Proyecto</InputLabel>
                        <Select
                            name="project"
                            value={formData.projectId} // REVIEW
                            onChange={handleChange}
                        >
                            <MenuItem value="carrera">Mejora y actualización de </MenuItem>
                            <MenuItem value="carrera">Proyecto de fuga de </MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Enlace"
                        name="link"
                        value={formData.link}
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

ReportModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default ReportModal;