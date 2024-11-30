import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Box } from '@mui/material';
import { FilterMatchMode } from 'primereact/api';
import UserModal from './NewUserModal';
import TableHeader from './TableHeader';
import RoleFilterTemplate from './RoleFilterTemplate';

const USERS = [
    { nombre: 'Juan Perez', email: 'juan.perez@example.com', role: 'Alumno' },
    { nombre: 'Maria Gomez', email: 'maria.gomez@example.com', role: 'Coordinador de Carrera' },
    { nombre: 'Carlos Sanchez', email: 'carlos.sanchez@example.com', role: 'Docente' },
    { nombre: 'Ana Martinez', email: 'ana.martinez@example.com', role: 'Docente' },
    { nombre: 'Luis Rodriguez', email: 'luis.rodriguez@example.com', role: 'Jefe Academico' },
    { nombre: 'Sofia Fernandez', email: 'sofia.fernandez@example.com', role: 'Alumno' },
    { nombre: 'Miguel Torres', email: 'miguel.torres@example.com', role: 'Jefe Academico' },
    { nombre: 'Laura Ramirez', email: 'laura.ramirez@example.com', role: 'Docente' },
    { nombre: 'Jorge Lopez', email: 'jorge.lopez@example.com', role: 'Presidente de Academia' },
    { nombre: 'Elena Diaz', email: 'elena.diaz@example.com', role: 'Alumno' },
];

const ROLES = ['Alumno', 'Coordinador de Carrera', 'Docente', 'Jefe Academico', 'Presidente de Academia'];

const UsersView = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        role: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setFilters((prevFilters) => ({
            ...prevFilters,
            global: { ...prevFilters.global, value },
        }));
        setGlobalFilterValue(value);
    };

    return (
        <Box>
            <UserModal open={isModalOpen} handleClose={handleModalClose} />
            <DataTable
                header={<TableHeader globalFilterValue={globalFilterValue} onGlobalFilterChange={onGlobalFilterChange} onOpenModal={handleModalOpen} />}
                value={USERS}
                stripedRows
                paginator
                removableSort
                rows={5}
                filters={filters}
                onFilter={(e) => setFilters(e.filters)}
                filterDisplay='row'
                globalFilterFields={['nombre', 'email', 'role']}
                emptyMessage="No se encontraron usuarios."
            >
                <Column header="Nombre" filter filterPlaceholder="Buscar por nombre" sortable style={{ width: '40%' }} field='nombre'></Column>
                <Column header="Email" filter filterPlaceholder="Buscar por correo" sortable style={{ width: '30%' }} field='email'></Column>
                <Column
                    header="Rol"
                    sortable
                    style={{ width: '20%' }}
                    field='role'
                    filter
                    filterElement={RoleFilterTemplate}
                    showFilterMenu={false}
                />
            </DataTable>
        </Box>
    );
}

export default UsersView;