import React, { useState } from 'react';
import { Box } from '@mui/material';
import NavBar from './NavBar';
import SideBar from './SideBar';
import ProjectTable from './ProjectTable';

const LayoutStyles = {
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        display: 'flex',
        flexGrow: 1,
    },
    sidebar: {
        width: '25vw',
        borderRight: '0.5px solid #e0e0e0',
    },
    content: {
        flexGrow: 1,
        padding: '20vh 1rem 0px 16px',
        backgroundColor: '#152027',
    },
};

export default function Layout() {
    const [selectedOption, setSelectedOption] = useState(0);

    const renderContent = () => {
        switch (selectedOption) {
            case 0:
                return <div>Usuarios</div>;
            case 1:
                return <ProjectTable></ProjectTable>
            case 2:
                return <div>Reportes</div>;
            default:
                return <div>D</div>;
        }
    };

    return (
        <Box sx={LayoutStyles.container}>
            <NavBar />
            <Box sx={LayoutStyles.main}>
                <Box sx={LayoutStyles.sidebar}>
                    <SideBar onOptionChange={setSelectedOption} />
                </Box>
                <Box sx={LayoutStyles.content}>
                    {renderContent()}
                </Box>
            </Box>
        </Box>
    );
}
