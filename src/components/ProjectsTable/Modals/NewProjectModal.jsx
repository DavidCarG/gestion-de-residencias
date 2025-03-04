import { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid2'; // Grid2 import
import PropTypes from 'prop-types';
import {
    createProject,
    fetchProjects,
    updateProject,
} from '../../../api/projects';
import { useProjectsContext } from '../../../context/Projects';

const NewProjectModal = ({ open, handleClose, data }) => {
    const [formData, setFormData] = useState({
        projectName: '',
        requestingCompany: '',
        releaseDate: '',
        advisor: '',
        advisorMail: '',
        advisorContactPhone: '',
        city: '',
        state: '',
        career: '',
        summary: '',
    });

    const { updateTableData } = useProjectsContext();

    useEffect(() => {
        if (data) {
            const {
                projectName,
                requestingCompany,
                releaseDate,
                advisor,
                advisorMail,
                advisorContactPhone,
                city,
                state,
                career,
                summary,
            } = data;
            setFormData({
                projectName,
                requestingCompany,
                releaseDate: releaseDate
                    ? new Date(releaseDate).toISOString().split('T')[0]
                    : '',
                advisor,
                advisorMail,
                advisorContactPhone,
                city,
                state,
                career,
                summary,
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        const formattedData = {
            ...formData,
            releaseDate: new Date(formData.releaseDate),
        };

        if (data) {
            await updateProject(data._id, formattedData);
        } else {
            await createProject(formattedData);
        }

        const newData = await fetchProjects();
        updateTableData(newData);
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    p: 4,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 1,
                    width: 600,
                    margin: 'auto',
                    mt: '10vh',
                }}
            >
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Project Name"
                            name="projectName"
                            value={formData.projectName}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Requesting Company"
                            name="requestingCompany"
                            value={formData.requestingCompany}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Release Date"
                            name="releaseDate"
                            type="date"
                            value={formData.releaseDate}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Advisor"
                            name="advisor"
                            value={formData.advisor}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Advisor Email"
                            name="advisorMail"
                            value={formData.advisorMail}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Advisor Contact Phone"
                            name="advisorContactPhone"
                            value={formData.advisorContactPhone}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="State"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Career"
                            name="career"
                            value={formData.career}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            label="Summary"
                            name="summary"
                            value={formData.summary}
                            onChange={handleChange}
                            required
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Box
                    sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

NewProjectModal.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default NewProjectModal;
