import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Box } from '@mui/material';
import { FilterMatchMode } from 'primereact/api';
import UserModal from './NewUserModal';
import TableHeader from './TableHeader';
import RoleFilterTemplate from './RoleFilterTemplate';

const USERS = [
    { nombre: 'Juan Perez', email: 'juan.perez@gmail.com', role: 'Alumno' },
    { nombre: 'Maria Gomez', email: 'maria.gomez@itlalaguna.edu.mx', role: 'Coordinador de Carrera' },
    { nombre: 'Carlos Sanchez', email: 'carlos.sanchez@outlook.com', role: 'Alumno' },
    { nombre: 'Ana Martinez', email: 'ana.martinez@gmail.com', role: 'Alumno' },
    { nombre: 'Luis Rodriguez', email: 'luis.rodriguez@itlalaguna.edu.mx', role: 'Jefe Academico' },
    { nombre: 'Sofia Fernandez', email: 'sofia.fernandez@hotmail.com', role: 'Alumno' },
    { nombre: 'Miguel Torres', email: 'miguel.torres@itlalaguna.edu.mx', role: 'Jefe Academico' },
    { nombre: 'Laura Ramirez', email: 'laura.ramirez@gmail.com', role: 'Alumno' },
    { nombre: 'Jorge Lopez', email: 'jorge.lopez@itlalaguna.edu.mx', role: 'Coordinador de Carrera' },
    { nombre: 'Elena Diaz', email: 'elena.diaz@outlook.com', role: 'Alumno' },
    { nombre: 'Daniel Alvarez', email: 'daniel.alvarez@gmail.com', role: 'Alumno' },
    { nombre: 'Paola Hernandez', email: 'paola.hernandez@itlalaguna.edu.mx', role: 'Jefe Academico' },
    { nombre: 'Fernando Morales', email: 'fernando.morales@gmail.com', role: 'Alumno' },
    { nombre: 'Alejandra Vargas', email: 'alejandra.vargas@hotmail.com', role: 'Alumno' },
    { nombre: 'Ricardo Castillo', email: 'ricardo.castillo@gmail.com', role: 'Alumno' },
    { nombre: 'Monica Rios', email: 'monica.rios@itlalaguna.edu.mx', role: 'Coordinador de Carrera' },
    { nombre: 'Gabriel Soto', email: 'gabriel.soto@gmail.com', role: 'Alumno' },
    { nombre: 'Angela Salinas', email: 'angela.salinas@outlook.com', role: 'Alumno' },
    { nombre: 'Victor Ramirez', email: 'victor.ramirez@gmail.com', role: 'Alumno' },
    { nombre: 'Carolina Lopez', email: 'carolina.lopez@hotmail.com', role: 'Alumno' },
    { nombre: 'Oscar Gonzalez', email: 'oscar.gonzalez@gmail.com', role: 'Alumno' },
    { nombre: 'Diana Estrada', email: 'diana.estrada@outlook.com', role: 'Alumno' },
    { nombre: 'Francisco Torres', email: 'francisco.torres@itlalaguna.edu.mx', role: 'Coordinador de Carrera' },
    { nombre: 'Valeria Mejia', email: 'valeria.mejia@hotmail.com', role: 'Alumno' },
    { nombre: 'Hector Ponce', email: 'hector.ponce@gmail.com', role: 'Alumno' },
    { nombre: 'Andrea Ruiz', email: 'andrea.ruiz@itlalaguna.edu.mx', role: 'Coordinador de Carrera' },
    { nombre: 'Roberto Cruz', email: 'roberto.cruz@hotmail.com', role: 'Alumno' },
    { nombre: 'Camila Fernandez', email: 'camila.fernandez@gmail.com', role: 'Alumno' },
    { nombre: 'Ignacio Soto', email: 'ignacio.soto@itlalaguna.edu.mx', role: 'Coordinador de Carrera' },
    { nombre: 'Patricia Navarro', email: 'patricia.navarro@gmail.com', role: 'Alumno' },
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