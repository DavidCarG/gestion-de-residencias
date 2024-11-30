import React from 'react';
import { Dropdown } from 'primereact/dropdown';

const RoleFilterTemplate = ({ options, roles }) => {
    return (
        <Dropdown
            value={options.value}
            options={roles}
            onChange={(e) => options.filterCallback(e.value, options.index)}
            placeholder="Select One"
            className="p-column-filter"
            showClear
        />
    );
};

export default RoleFilterTemplate;