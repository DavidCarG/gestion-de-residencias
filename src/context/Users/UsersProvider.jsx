import { useState } from 'react';
import { UsersContext } from './index'; // Corrected import path
import PropTypes from 'prop-types';

const UsersProvider = ({ children }) => {
    const [tableData, setTableData] = useState([]);

    const updateTableData = (newData) => {
        setTableData(newData);
    };

    return (
        <UsersContext.Provider value={{ tableData, updateTableData }}>
            {children}
        </UsersContext.Provider>
    );
};

UsersProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UsersProvider;
