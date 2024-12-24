import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Box } from "@mui/material";
import { FilterMatchMode } from "primereact/api";
import TableHeader from "./TableHeader";
import RoleFilterTemplate from "./FilterTemplates/RoleFilterTemplate";
import { OptionsBodyTemplate } from "./BodyTemplates/OptionsBodyTemplate";
import { createUser } from "../../api/users";
import PropTypes from "prop-types";
import { RoleBodyTemplate } from "./BodyTemplates/RoleBodyTemplate";
import UserModal from "./Modals/NewUserModal";

const UsersTable = ({ data, loading, error }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const [filters, setFilters] = useState({
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    role: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  return (
    <Box
      sx={{
        margin: "12vh 2rem 3vh 2rem",
      }}
    >
      {error && <Box sx={{ color: "red", marginBottom: "1rem" }}>{error}</Box>}
      <UserModal
        handleClose={handleModalClose}
        handleSave={createUser}
        open={isModalOpen}
      />
      <DataTable
        emptyMessage="No se encontraron usuarios."
        filterDisplay="row"
        filters={filters}
        header={<TableHeader onOpenModal={handleModalOpen} />}
        loading={loading}
        onFilter={(e) => setFilters(e.filters)}
        paginator
        removableSort
        rows={5}
        rowsPerPageOptions={[5, 10, 25]}
        size="small"
        stripedRows
        value={data}
      >
        <Column
          field="name"
          filter
          filterPlaceholder="Buscar por nombre"
          header="Nombre"
          sortable
          style={{ width: "40%" }}
        />
        <Column
          field="email"
          filter
          filterPlaceholder="Buscar por correo"
          header="Email"
          sortable
          style={{ width: "30%" }}
        />
        <Column
          body={RoleBodyTemplate}
          field="role"
          filter
          filterElement={RoleFilterTemplate}
          header="Rol"
          showFilterMenu={false}
          sortable
          style={{ width: "20%" }}
        />
        <Column body={OptionsBodyTemplate} style={{ width: "5%" }} />
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
        "jefe_academico",
        "profesor",
        "presidente_academia",
        "coordinador_carrera",
        "estudiante",
      ]),
    })
  ),
  error: PropTypes.string,
  loading: PropTypes.bool,
};

export default UsersTable;
