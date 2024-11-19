import React from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function OptionsMenu() {
    return (
        <List component="nav" sx={{}}>
            <ListItemButton
                selected={true}
                onClick={() => { }}
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
                selected={false}
                onClick={() => { }}
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
                selected={false}
                onClick={() => { }}
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
    );
}