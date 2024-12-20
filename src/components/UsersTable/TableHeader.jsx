import { Box, Button } from '@mui/material';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import PropTypes from 'prop-types';

const TableHeader = ({ globalFilterValue, onGlobalFilterChange, onOpenModal }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '1rem',
                alignItems: 'center',
            }}
        >
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Busqueda global" />
            </IconField>

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
    globalFilterValue: PropTypes.string.isRequired,
    onGlobalFilterChange: PropTypes.func.isRequired,
    onOpenModal: PropTypes.func.isRequired,
};

export default TableHeader;