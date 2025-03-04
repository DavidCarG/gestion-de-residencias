import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';

const TableHeader = ({ onOpenModal }) => {
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
                Crear Usuario
            </Button>
        </Box>
    );
};

TableHeader.propTypes = {
    onOpenModal: PropTypes.func.isRequired,
};

export default TableHeader;