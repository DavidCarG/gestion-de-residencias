import { useState } from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

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
    overflowY: 'auto'
};

function AssignModal({ open, handleClose }) {
    const [formData, setFormData] = useState({
        asignee: '',
        link:''
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
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Encargado</InputLabel>
                        <Select
                            name="asignee"
                            value={formData.asignee}
                            onChange={handleChange}
                        >
                            <MenuItem value="spring">asignee 1</MenuItem>
                        </Select>
                    </FormControl> 

                    <TextField
                        label="Enlace"
                        multiline
                        name="summary"
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

AssignModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default AssignModal;