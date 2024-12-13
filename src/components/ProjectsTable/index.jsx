import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from 'react';
import { OptionsBodyTemplate, ReportBodyTemplate, StatusBodyTemplate, StatusFilterTemplate } from './BodyTemplates';
import { Box, Alert } from '@mui/material';
import NewProjectModal from './NewProjectModal';
import CreateProject from './TableHeader';
import { FilterMatchMode } from 'primereact/api';
import PropTypes from 'prop-types';
import { createProject } from '../../api/projects';

export default function ProjectsTable({data, loading, error}) {
    const [filters, setFilters] = useState({
        projectName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        assigned: { value: null, matchMode: FilterMatchMode.EQUALS },
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    return (
        <Box
        margin={'5vh 2rem 7vh 2rem'}
        >
            {error && <Alert severity="error">{error}</Alert>}
            <CreateProject onOpenModal={handleModalOpen} />
            <NewProjectModal open={isModalOpen} handleClose={handleModalClose} handleSave={createProject} />
            <DataTable
                value={data}
                paginator
                removableSort
                filters={filters}
                onFilter={(e) => setFilters(e.filters)}
                loading={loading}
                rows={6}
                size='small'
                emptyMessage="No se encontraron proyectos."
                filterDisplay='row'
                globalFilterFields={['projectName', 'assigned']}
            >
                <Column
                    header="Proyecto"
                    style={{ width: '25%' }}
                    field='projectName'
                    filter
                    sortable
                    filterPlaceholder='Buscar por nombre'
                />
                <Column
                    header="Compañía"
                    style={{ width: '20%' }}
                    field='requestingCompany'
                    filter
                    sortable
                    filterPlaceholder='Buscar por compañía'
                />
                <Column
                    header="Estatus"
                    style={{ width: '15%' }}
                    field='assigned'
                    body={StatusBodyTemplate}
                    filter
                    filterElement={StatusFilterTemplate}
                    showFilterMenu={false}
                />
                <Column
                    header="Fecha de creación"
                    style={{ width: '10%' }}
                    field='releaseDate'
                    sortable                
                />
                <Column
                    header="Supervisor"
                    style={{ width: '10%' }}
                    field='advisor'
                    sortable  
                />
                <Column
                    header="Carrera"
                    style={{ width: '10%' }}
                    field='career'
                    sortable  
                />
                <Column
                    header="Reportes"
                    style={{ width: '5%' }}
                    body={ReportBodyTemplate}
                    field='reports'
                    sortable
                />
                <Column
                    style={{ width: '5%' }}
                    body={OptionsBodyTemplate}
                />
            </DataTable >
        </Box>
    );
}

ProjectsTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};