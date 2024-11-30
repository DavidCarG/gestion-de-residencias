import React from 'react';
import { Dropdown } from 'primereact/dropdown';

const roles = ['Alumno', 'Coordinador de Carrera', 'Docente', 'Jefe Academico', 'Presidente de Academia'];

const RoleFilterTemplate = (options) => {
    return (
        <Dropdown
            value={options.value}
            options={roles}
            onChange={(e) => options.filterApplyCallback(e.value)}
            placeholder="Select One"
            className="p-column-filter"
            showClear
        />
    );
};

export default RoleFilterTemplate;