import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Box } from '@mui/material';
import { FilterMatchMode } from 'primereact/api';
import TableHeader from './TableHeader';
import RoleFilterTemplate from './FilterTemplates/RoleFilterTemplate';
import { OptionsBodyTemplate } from './BodyTemplates/OptionsBodyTemplate';
import PropTypes from 'prop-types';
import { RoleBodyTemplate } from './BodyTemplates/RoleBodyTemplate';
import UserModal from './Modals/NewUserModal';
import { defaultTableProps } from '../consts';
import { useUsersContext } from '../../context/Users';
import { useEffect } from 'react';

const UsersTable = ({ data: initialData, loading, error }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const [filters, setFilters] = useState({
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        role: { value: null, matchMode: FilterMatchMode.EQUALS },
    });

    const [data, setData] = useState(initialData);
    const { tableData } = useUsersContext();

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
                <Box sx={{ color: 'red', marginBottom: '1rem' }}>{error}</Box>
            )}
            <UserModal handleClose={handleModalClose} open={isModalOpen} />
            <DataTable
                emptyMessage="No se encontraron usuarios."
                filters={filters}
                header={<TableHeader onOpenModal={handleModalOpen} />}
                loading={loading}
                onFilter={(e) => setFilters(e.filters)}
                selection={selectedRow}
                onSelectionChange={(e) => setSelectedRow(e.value)}
                value={data}
                {...defaultTableProps}
            >
                <Column
                    field="name"
                    filter
                    filterPlaceholder="Buscar por nombre"
                    header="Nombre"
                    sortable
                    style={{ width: '40%' }}
                />
                <Column
                    field="email"
                    filter
                    filterPlaceholder="Buscar por correo"
                    header="Email"
                    sortable
                    style={{ width: '30%' }}
                />
                <Column
                    body={RoleBodyTemplate}
                    field="role"
                    filter
                    filterElement={RoleFilterTemplate}
                    header="Rol"
                    showFilterMenu={false}
                    sortable
                    style={{ width: '20%' }}
                />
                <Column body={OptionsBodyTemplate} style={{ width: '5%' }} />
            </DataTable>
        </Box>
    );
};

UsersTable.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            email: PropTypes.string,
            name: PropTypes.string,
            permissions: PropTypes.arrayOf(PropTypes.string),
            role: PropTypes.oneOf([
                'jefe_academico',
                'profesor',
                'presidente_academia',
                'coordinador_carrera',
                'estudiante',
            ]),
        })
    ),
    error: PropTypes.string,
    loading: PropTypes.bool,
};

export default UsersTable;
