import { useState } from 'react';
import { ReportsContext } from './index';
import PropTypes from 'prop-types';

const ReportsProvider = ({ children }) => {
    const [tableData, setTableData] = useState([]);

    const updateTableData = (newData) => {
        setTableData(newData);
    };

    return (
        <ReportsContext.Provider value={{ tableData, updateTableData }}>
            {children}
        </ReportsContext.Provider>
    );
};

ReportsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ReportsProvider;
