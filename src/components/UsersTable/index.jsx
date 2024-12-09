import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Box } from '@mui/material';
import { FilterMatchMode } from 'primereact/api';
import UserModal from './NewUserModal';
import TableHeader from './TableHeader';
import RoleFilterTemplate from './RoleFilterTemplate';

// eslint-disable-next-line react/prop-types, no-unused-vars
const UsersTable = ({ data, loading, error }) => {
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
        <Box
        sx={{
            margin:'12vh 2rem 3vh 2rem',
        }}
        >
            <UserModal open={isModalOpen} handleClose={handleModalClose} />
            <DataTable
                header={<TableHeader globalFilterValue={globalFilterValue} onGlobalFilterChange={onGlobalFilterChange} onOpenModal={handleModalOpen} />}
                value={data}
                stripedRows
                paginator
                removableSort
                rows={5}
                filters={filters}
                onFilter={(e) => setFilters(e.filters)}
                filterDisplay='row'
                globalFilterFields={['nombre', 'email', 'role']}
                emptyMessage="No se encontraron usuarios."
                loading={loading}
            >
                <Column header="Nombre" filter filterPlaceholder="Buscar por nombre" sortable style={{ width: '40%' }} field='name'></Column>
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

export default UsersTable;