// filepath: src/ProjectsProvider.jsx
import { useState } from 'react';
import { ProjectsContext } from './index'; // Corrected import path
import PropTypes from 'prop-types';

const ProjectsProvider = ({ children }) => {
    const [tableData, setTableData] = useState([]);

    const updateTableData = (newData) => {
        setTableData(newData);
    };

    return (
        <ProjectsContext.Provider value={{ tableData, updateTableData }}>
            {children}
        </ProjectsContext.Provider>
    );
};

ProjectsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProjectsProvider;
