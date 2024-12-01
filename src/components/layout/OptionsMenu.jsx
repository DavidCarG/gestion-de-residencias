import { useState } from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from 'react-router-dom';

export default function OptionsMenu() {
    const [selectedBtn, setSelectedBtn] = useState(-1);
    const navigate = useNavigate();

    const handleListItem = (i, path) => {
        setSelectedBtn(i);
        navigate(path);
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
                    onClick={() => handleListItem(0, '/usuarios')}
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
                    onClick={() => handleListItem(1, '/proyectos')}
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
                    onClick={() => handleListItem(2, '/reportes')}
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