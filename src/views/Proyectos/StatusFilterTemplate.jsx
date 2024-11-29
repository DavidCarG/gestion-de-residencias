import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';

const getStatus = (status) => {
    switch (status) {
        case 'unassigned':
            return 'danger';

        case 'assigned':
            return 'success';

        default:
            return null;
    }
};

const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getStatus(option)} />;
};

const statuses = ['unassigned', 'assigned'];

const StatusFilterTemplate = (options) => {
    console.log(options);
    return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select One" showClear />;
};

export default StatusFilterTemplate;