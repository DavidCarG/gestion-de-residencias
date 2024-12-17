import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Box } from '@mui/material';
import { FilterMatchMode } from 'primereact/api';
import UserModal from './NewUserModal';
import TableHeader from './TableHeader';
import RoleFilterTemplate from './BodyTemplates/RoleFilterTemplate';
import { OptionsBodyTemplate } from './BodyTemplates/OptionsBodyTemplate';
import { createUser } from '../../api/users';
import PropTypes from 'prop-types';

//TODO fix or remove global filter
const UsersTable = ({ data, loading, error }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        role: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setFilters((filters) => ({
            ...filters,
            global: { ...filters.global, value },
        }));
        setGlobalFilterValue(value);
    };

    return (
        <Box
        sx={{
            margin:'12vh 2rem 3vh 2rem',
        }}
        >
            {error && <Box sx={{ color: 'red', marginBottom: '1rem' }}>{error}</Box>}
            <UserModal open={isModalOpen} handleSave={createUser} handleClose={handleModalClose} />
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
                <Column
                style={{ width: '5%' }}
                body={OptionsBodyTemplate}
                />
            </DataTable>
        </Box>
    );
}

UsersTable.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            email: PropTypes.string,
            role: PropTypes.oneOf(["jefe_academico", "profesor", "presidente_academia", "coordinador_carrera", "estudiante"]),
            permissions: PropTypes.arrayOf(PropTypes.string)
        })
    ),
    loading: PropTypes.bool,
    error: PropTypes.string
};

export default UsersTable;