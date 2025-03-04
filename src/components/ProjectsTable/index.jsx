import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from 'react';
import { OptionsBodyTemplate } from './BodyTemplates/OptionsBodyTemplate';
import { StatusBodyTemplate } from './BodyTemplates/StatusBodyTemplate';
import { Box, Alert } from '@mui/material';
import NewProjectModal from './Modals/NewProjectModal';
import CreateProject from './TableHeader';
import { FilterMatchMode } from 'primereact/api';
import PropTypes from 'prop-types';
import { ReportBodyTemplate } from './BodyTemplates/ReportBodyTemplate';
import { StatusFilterTemplate } from './FilterTemplates/StatusFilterTemplate';
import { defaultTableProps } from '../consts';
import DateBodyTemplate from './BodyTemplates/DateBodyTemplate';
import { useProjectsContext } from '../../context/Projects';
import { useEffect } from 'react';

export default function ProjectsTable({ data: initialData, loading, error }) {
    const [filters, setFilters] = useState({
        projectName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        requestingCompany: {
            value: null,
            matchMode: FilterMatchMode.STARTS_WITH,
        },
        assigned: { value: null, matchMode: FilterMatchMode.EQUALS },
    });

    const [data, setData] = useState(initialData);
    const { tableData } = useProjectsContext();

    useEffect(() => {
        if (initialData && initialData.length > 0) {
            setData(initialData);
        }
    }, [initialData]);

    useEffect(() => {
        if (tableData && tableData.length > 0) {
            setData(tableData);
        }
    }, [tableData]);

    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    return (
        <Box
            sx={{
                margin: '3rem 2rem',
                height: '90vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            {error && <Alert severity="error">{error}</Alert>}
            <CreateProject onOpenModal={handleModalOpen} />
            <NewProjectModal
                open={isModalOpen}
                handleClose={handleModalClose}
            />
            <DataTable
                value={data}
                filters={filters}
                onFilter={(e) => setFilters(e.filters)}
                loading={loading}
                selection={selectedRow}
                onSelectionChange={(e) => setSelectedRow(e.value)}
                emptyMessage="No se encontraron proyectos."
                globalFilterFields={['projectName', 'assigned']}
                {...defaultTableProps}
            >
                <Column
                    field="projectName"
                    header="Proyecto"
                    filter
                    filterPlaceholder="Buscar por nombre"
                    sortable
                    style={{ width: '25%' }}
                />
                <Column
                    field="requestingCompany"
                    header="Compañía"
                    filter
                    filterPlaceholder="Buscar por compañía"
                    sortable
                    style={{ width: '20%' }}
                />
                <Column
                    field="assigned"
                    header="Estatus"
                    body={StatusBodyTemplate}
                    filter
                    filterElement={StatusFilterTemplate}
                    showFilterMenu={false}
                    style={{ width: '15%' }}
                />
                <Column
                    field="releaseDate"
                    header="Fecha de creación"
                    body={DateBodyTemplate}
                    sortable
                    style={{ width: '10%' }}
                />
                <Column
                    field="advisor"
                    header="Supervisor"
                    sortable
                    style={{ width: '10%' }}
                />
                <Column
                    field="career"
                    header="Carrera"
                    sortable
                    style={{ width: '10%' }}
                />
                <Column
                    field="reports"
                    header="Reportes"
                    body={ReportBodyTemplate}
                    sortable
                    style={{ width: '5%' }}
                />
                <Column body={OptionsBodyTemplate} style={{ width: '5%' }} />
            </DataTable>
        </Box>
    );
}

ProjectsTable.propTypes = {
    data: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
};
