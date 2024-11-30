import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from 'react';
import { optionsBodyTemplate, reportBodyTemplate, StatusBodyTemplate, StatusFilterTemplate } from './BodyTemplates';
import { Box } from '@mui/material';
import UserModal from './NewUserModal';
import CreateProject from './TableHeader';

const PROJECTS = [
    { id: 1, nombre: "John Deere", status: 'asignado', reportes: 5 },
    { id: 2, nombre: "DevelopMX", status: 'asignado', reportes: 0 },
    { id: 3, nombre: "Milwuakee", status: 'sin asignar', reportes: 8 },
    { id: 4, nombre: "Chepina", status: 'asignado', reportes: 1 },
    { id: 5, nombre: "Caterpillar", status: 'asignado', reportes: 5 },
    { id: 6, nombre: "Lala", status: 'sin asignar', reportes: 0 },
];

export default function ProjectTable() {
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
                rows={5}
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