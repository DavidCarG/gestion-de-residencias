import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Box } from '@mui/material';
import { FilterMatchMode } from 'primereact/api';
import UserModal from './NewUserModal';
import TableHeader from './TableHeader';
import RoleFilterTemplate from './RoleFilterTemplate';

const REPORTS = [
    { author: 'David Cardenas Gonzalez', project: 'John Deere', link: 'https://www.google.com', date: '2021-10-10' },
    { author: 'Maria Lopez', project: 'DevelopMX', link: 'https://www.example.com', date: '2021-11-15' },
    { author: 'Carlos Sanchez', project: 'Milwuakee', link: 'https://www.example.com', date: '2021-12-20' },
    { author: 'Ana Martinez', project: 'Chepina', link: 'https://www.example.com', date: '2022-01-05' },
    { author: 'Luis Rodriguez', project: 'Caterpillar', link: 'https://www.example.com', date: '2022-02-10' },
    { author: 'Sofia Fernandez', project: 'Lala', link: 'https://www.example.com', date: '2022-03-15' },
    { author: 'Miguel Torres', project: 'PepsiCo', link: 'https://www.example.com', date: '2022-04-20' },
    { author: 'Laura Ramirez', project: 'Nestle', link: 'https://www.example.com', date: '2022-05-25' },
    { author: 'Jorge Lopez', project: 'Ford', link: 'https://www.example.com', date: '2022-06-30' },
    { author: 'Elena Diaz', project: 'Toyota', link: 'https://www.example.com', date: '2022-07-05' },
    { author: 'Juan Perez', project: 'Honda', link: 'https://www.example.com', date: '2022-08-10' },
    { author: 'Maria Gomez', project: 'Samsung', link: 'https://www.example.com', date: '2022-09-15' },
    { author: 'Carlos Sanchez', project: 'LG', link: 'https://www.example.com', date: '2022-10-20' },
    { author: 'Ana Martinez', project: 'Sony', link: 'https://www.example.com', date: '2022-11-25' },
    { author: 'Luis Rodriguez', project: 'Panasonic', link: 'https://www.example.com', date: '2022-12-30' },
    { author: 'Sofia Fernandez', project: 'Bosch', link: 'https://www.example.com', date: '2023-01-05' },
    { author: 'Miguel Torres', project: 'Siemens', link: 'https://www.example.com', date: '2023-02-10' },
    { author: 'Laura Ramirez', project: 'Philips', link: 'https://www.example.com', date: '2023-03-15' },
    { author: 'Jorge Lopez', project: 'Microsoft', link: 'https://www.example.com', date: '2023-04-20' },
    { author: 'Elena Diaz', project: 'Apple', link: 'https://www.example.com', date: '2023-05-25' },
];

const ReportsView = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        role: { value: null, matchMode: FilterMatchMode.IN },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

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
                value={REPORTS}
                stripedRows
                paginator
                removableSort
                rows={5}
                filters={filters}
                filterDisplay='row'
                globalFilterFields={['nombre', 'email', 'role']}
                emptyMessage="No se encontraron usuarios."
            >
                <Column header="Autor" filter filterPlaceholder="Buscar por autor" sortable style={{ width: '40%' }} field='author'></Column>
                <Column header="Proyecto" filter filterPlaceholder="Buscar por proyecto" sortable style={{ width: '30%' }} field='project'></Column>
                <Column header="Fecha" sortable style={{ width: '10%' }} field='date'></Column>
                <Column header="Link" style={{ width: '20%' }} field='link'></Column>
            </DataTable>
        </Box>
    );
}

export default ReportsView;