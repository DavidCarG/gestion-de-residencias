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
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { createUser, updateUser } from '../../../api/users';

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
};

function UserModal({ open, handleClose, data }) {
    const toast = useRef(null);

    const showSuccess = (msg) => {
        toast.current.show({
            severity: 'success',
            summary: 'Exito',
            detail: msg,
            life: 3000,
        });
    };

    const showError = (msg) => {
        toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: msg,
            life: 3000,
        });
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
    });

    useEffect(() => {
        if (data) {
            const { name, email, role } = data;
            setFormData({
                name,
                email,
                role,
            });
        }
    }, [data]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = data
                ? await updateUser(data._id, formData)
                : await createUser(formData);

            showSuccess(response.data.message);
        } catch (error) {
            showError(error.message);
        }

        handleClose();
    };

    return (
        <Box>
            <Toast ref={toast} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    <h2 id="modal-title">
                        {data ? 'Modificar Usuario' : 'Nuevo Usuario'}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Nombre"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Rol</InputLabel>
                            <Select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <MenuItem value="jefe_academico">
                                    Jefe Academico
                                </MenuItem>
                                <MenuItem value="profesor">Profesor</MenuItem>
                                <MenuItem value="presidente_academia">
                                    Presidente de Academia
                                </MenuItem>
                                <MenuItem value="coordinador_carrera">
                                    Coordinador de Carrera
                                </MenuItem>
                                <MenuItem value="estudiante">
                                    Estudiante
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            {data ? 'Actualizar' : 'Crear'}
                        </Button>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
}

UserModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    data: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        email: PropTypes.string,
        role: PropTypes.string,
    }),
};

export default UserModal;
