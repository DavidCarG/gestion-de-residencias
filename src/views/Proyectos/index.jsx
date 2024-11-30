import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from 'react';
import { optionsBodyTemplate, reportBodyTemplate, StatusBodyTemplate, StatusFilterTemplate } from './BodyTemplates';
import { Box } from '@mui/material';
import UserModal from './NewUserModal';
import CreateProject from './TableHeader';
import { FilterMatchMode } from 'primereact/api';

const PROJECTS = [
    { id: 1, nombre: "John Deere", status: 'asignado', reportes: 5 },
    { id: 2, nombre: "DevelopMX", status: 'asignado', reportes: 8 },
    { id: 3, nombre: "Milwuakee", status: 'sin asignar', reportes: 0 },
    { id: 4, nombre: "Chepina", status: 'asignado', reportes: 1 },
    { id: 5, nombre: "Caterpillar", status: 'asignado', reportes: 5 },
    { id: 6, nombre: "Lala", status: 'sin asignar', reportes: 0 },
    { id: 7, nombre: "Soriana", status: 'asignado', reportes: 12 },
    { id: 8, nombre: "Peñoles", status: 'sin asignar', reportes: 0 },
    { id: 9, nombre: "Grupo Bimbo", status: 'asignado', reportes: 11 },
    { id: 10, nombre: "Cervecería Modelo", status: 'sin asignar', reportes: 0 },
    { id: 11, nombre: "Cemex", status: 'asignado', reportes: 9 },
    { id: 12, nombre: "Grupo Aeroportuario", status: 'sin asignar', reportes: 0 },
    { id: 13, nombre: "Nemak", status: 'asignado', reportes: 13 },
    { id: 14, nombre: "Grupo Alfa", status: 'asignado', reportes: 2 },
    { id: 15, nombre: "Industrias CH", status: 'sin asignar', reportes: 0 },
    { id: 16, nombre: "Femsa", status: 'asignado', reportes: 7 },
    { id: 17, nombre: "Vitro", status: 'sin asignar', reportes: 0 },
    { id: 18, nombre: "Coca-Cola FEMSA", status: 'asignado', reportes: 10 },
    { id: 19, nombre: "Alsea", status: 'sin asignar', reportes: 0 },
    { id: 20, nombre: "Televisa", status: 'asignado', reportes: 8 },
];


export default function ProjectTable() {
    const [filters, setFilters] = useState({
        nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    return (
        <Box>
            <CreateProject onOpenModal={handleModalOpen} />
            <UserModal open={isModalOpen} handleClose={handleModalClose} />
            <DataTable
                value={PROJECTS}
                paginator
                removableSort
                filters={filters}
                onFilter={(e) => setFilters(e.filters)}
                rows={6}
                size='small'
                emptyMessage="No se encontraron proyectos."
                filterDisplay='row'
                globalFilterFields={['nombre', 'status']}
            >
                <Column
                    header="Proyecto"
                    style={{ width: '40%' }}
                    field='nombre'
                    filter
                    sortable
                    filterPlaceholder='Buscar por nombre'
                >
                </Column>
                <Column
                    header="Estatus"
                    style={{ width: '30%' }}
                    field='status'
                    body={StatusBodyTemplate}
                    filter
                    filterElement={StatusFilterTemplate}
                    showFilterMenu={false}
                >
                </Column >
                <Column
                    header="Reportes"
                    style={{ width: '20%' }}
                    body={reportBodyTemplate}
                    field='reportes'
                    sortable
                >
                </Column>
                <Column
                    style={{ width: '10%' }}
                    body={optionsBodyTemplate}
                >
                </Column>
            </DataTable >
        </Box>
    );
}