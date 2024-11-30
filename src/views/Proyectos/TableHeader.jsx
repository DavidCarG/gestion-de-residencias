import React from 'react';
import { Box, Button } from '@mui/material';

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

export default CreateProject;