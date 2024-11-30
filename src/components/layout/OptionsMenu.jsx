import React, { useState } from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function OptionsMenu({ onOptionChange }) {
    const [selectedBtn, setSelectedBtn] = useState(0);

    const handleListItem = (i) => {
        setSelectedBtn(i);
        onOptionChange(i);
    };

    return (
        <Box
            sx={{
                marginTop: '1rem',
            }}
        >
            <List component="nav">
                <ListItemButton
                    selected={selectedBtn === 0}
                    onClick={() => handleListItem(0)}
                    sx={{
                        borderRadius: '8px',
                        width: '90%',
                        margin: '10px auto 8px 10px',
                    }}
                >
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Usuarios" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedBtn === 1}
                    onClick={() => handleListItem(1)}
                    sx={{
                        borderRadius: '8px',
                        width: '90%',
                        margin: '10px auto 8px 10px',
                    }}
                >
                    <ListItemIcon>
                        <WorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Proyectos" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedBtn === 2}
                    onClick={() => handleListItem(2)}
                    sx={{
                        borderRadius: '8px',
                        width: '90%',
                        margin: '10px auto 8px 10px',
                    }}
                >
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reportes" />
                </ListItemButton>
            </List>
        </Box>
    );
}
