import React, { useState } from 'react';
import { Box } from '@mui/material';
import NavBar from './NavBar';
import SideBar from './SideBar';
import UsersView from '../../views/Usuarios';
import ProjectTable from '../../views/Proyectos';
import ReportsView from '../../views/Reportes';

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
    content: {
        flexGrow: 1,
        backgroundColor: '#152027',
        margin: '5rem 2rem 0 2rem',
        maxHeight: '90vh',
        overflowY: 'auto',
    },
};

export default function Layout() {
    const [selectedOption, setSelectedOption] = useState(0);

    const renderContent = () => {
        switch (selectedOption) {
            case 0:
                return <UsersView />;
            case 1:
                return <ProjectTable />
            case 2:
                return <ReportsView />;
            default:
                return <div>D</div>;
        }
    };

    return (
        <Box sx={LayoutStyles.container}>
            <NavBar />
            <Box sx={LayoutStyles.main}>
                <SideBar onOptionChange={setSelectedOption} />
                <Box sx={LayoutStyles.content}>
                    {renderContent()}
                </Box>
            </Box>
        </Box>
    );
}
