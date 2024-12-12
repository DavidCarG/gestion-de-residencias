import { Box, Button } from '@mui/material';
import propTypes from 'prop-types';

const CreateProject = ({ onOpenModal }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '1rem',
                alignItems: 'center',
            }}
        >
            <Button
                variant="contained"
                color="primary"
                sx={{
                    margin: '1rem 0'
                }}
                onClick={onOpenModal}>
                Crear Proyecto
            </Button>
        </Box>
    );
};

CreateProject.propTypes = {
    onOpenModal: propTypes.func.isRequired,
};

export default CreateProject;