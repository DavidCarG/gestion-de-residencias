import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Box, Alert } from '@mui/material';
import { FilterMatchMode } from 'primereact/api';
import { LinkBodyTemplate } from './BodyTemplates/LinkBodyTemplate';
import PropTypes from 'prop-types';
import { OptionsBodyTemplate } from './BodyTemplates/OptionsBodyTemplate';
import { defaultTableProps } from '../consts';
import { useReportsContext } from '../../context/Reports';
import { useEffect } from 'react';
import DateBodyTemplate from './BodyTemplates/DateBodyTemplate';

const ReportsTable = ({ data: initialData, loading, error }) => {
    const [filters, setFilters] = useState({
        userName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        projectName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [selectedRow, setSelectedRow] = useState(null);
    const [data, setData] = useState(initialData);
    const { tableData } = useReportsContext();

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
            {error && (
                <Alert severity="error">
                    {error.message || 'Error fetching reports'}
                </Alert>
            )}
            <DataTable
                value={data}
                filters={filters}
                loading={loading}
                onFilter={(e) => setFilters(e.filters)}
                emptyMessage="No se encontraron reportes."
                selection={selectedRow}
                onSelectionChange={(e) => setSelectedRow(e.value)}
                {...defaultTableProps}
            >
                <Column
                    header="Autor"
                    filter
                    filterPlaceholder="Buscar por autor"
                    sortable
                    style={{ width: '40%' }}
                    field="userName"
                ></Column>
                <Column
                    header="Proyecto"
                    filter
                    filterPlaceholder="Buscar por proyecto"
                    sortable
                    style={{ width: '30%' }}
                    field="projectName"
                ></Column>
                <Column
                    body={DateBodyTemplate}
                    header="Fecha"
                    sortable
                    style={{ width: '20%' }}
                    field="createdAt"
                ></Column>
                <Column
                    style={{ width: '10%' }}
                    field="link"
                    body={LinkBodyTemplate}
                />
                <Column style={{ width: '5%' }} body={OptionsBodyTemplate} />
            </DataTable>
        </Box>
    );
};

ReportsTable.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
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
        })
    ),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.any,
};

export default ReportsTable;
