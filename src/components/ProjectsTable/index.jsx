import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from 'react';
import { OptionsBodyTemplate, ReportBodyTemplate, StatusBodyTemplate, StatusFilterTemplate } from './BodyTemplates';
import { Box } from '@mui/material';
import ProjectModal from './NewProjectModal';
import CreateProject from './TableHeader';
import { FilterMatchMode } from 'primereact/api';

export default function ProjectsTable({data, loading, error}) {
    const [filters, setFilters] = useState({
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        assigned: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    return (
        <Box
        margin={'5vh 2rem 7vh 2rem'}
        >
            <CreateProject onOpenModal={handleModalOpen} />
            <ProjectModal open={isModalOpen} handleClose={handleModalClose} />
            <DataTable
                value={data}
                paginator
                removableSort
                filters={filters}
                onFilter={(e) => setFilters(e.filters)}
                rows={6}
                size='small'
                emptyMessage="No se encontraron proyectos."
                filterDisplay='row'
                globalFilterFields={['name', 'assigned']}
            >
                <Column
                    header="Proyecto"
                    style={{ width: '40%' }}
                    field='name'
                    filter
                    sortable
                    filterPlaceholder='Buscar por nombre'
                >
                </Column>
                <Column
                    header="Estatus"
                    style={{ width: '30%' }}
                    field='assigned'
                    body={StatusBodyTemplate}
                    filter
                    filterElement={StatusFilterTemplate}
                    showFilterMenu={false}
                >
                </Column >
                <Column
                    header="Reportes"
                    style={{ width: '20%' }}
                    body={ReportBodyTemplate}
                    field='reports'
                    sortable
                >
                </Column>
                <Column
                    style={{ width: '10%' }}
                    body={OptionsBodyTemplate}
                >
                </Column>
            </DataTable >
        </Box>
    );
}