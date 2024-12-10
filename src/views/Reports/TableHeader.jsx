import { Box, Button } from '@mui/material';
import propTypes from 'prop-types';

const CreateReport = ({ onOpenModal }) => {
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
                Crear Reporte
            </Button>
        </Box>
    );
};

CreateReport.propTypes = {
    onOpenModal: propTypes.func.isRequired,
};

export default CreateReport;