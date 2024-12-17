import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Box, Alert } from '@mui/material';
import { FilterMatchMode } from 'primereact/api';
import { LinkBodyTemplate } from './BodyTemplates/LinkBodyTemplate';
import PropTypes from 'prop-types';

const ReportsTable = ({data, loading, error}) => {
    const [filters, setFilters] = useState({
        userName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        projectName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    return (
        <Box
        sx={{
            margin:'5vh 2rem 5vh 2rem',
        }}
        >
            {error && <Alert severity="error">{error.message || 'Error fetching reports'}</Alert>}
            <DataTable
                value={data}
                stripedRows
                paginator
                removableSort
                rows={7}
                size='small'
                filters={filters}
                loading={loading}
                onFilter={(e) => setFilters(e.filters)}
                filterDisplay='row'
                globalFilterFields={['nombre', 'email', 'role']}
                emptyMessage="No se encontraron usuarios."
            >
                <Column header="Autor" filter filterPlaceholder="Buscar por autor" sortable style={{ width: '40%' }} field='userName'></Column>
                <Column header="Proyecto" filter filterPlaceholder="Buscar por proyecto" sortable style={{ width: '30%' }} field='projectName'></Column>
                <Column header="Fecha" sortable style={{ width: '20%' }} field='createdAt'></Column>
                <Column
                    style={{ width: '10%' }}
                    field='link'
                    body={LinkBodyTemplate}
                />
            </DataTable>
        </Box>
    );
}

ReportsTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        reportId: PropTypes.string.isRequired,
        projectId: PropTypes.string.isRequired,
        projectName: PropTypes.string.isRequired,
        requestingCompany: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        userEmail: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
    })).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.any
};

export default ReportsTable;