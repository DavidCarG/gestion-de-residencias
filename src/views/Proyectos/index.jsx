import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Avatar, Stack } from '@mui/material';
import { useRef } from 'react';
import StatusFilterTemplate from './StatusFilterTemplate';
import { useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Toolbar } from 'primereact/toolbar';
import ProjectModal from './createProjectModal';

const proyectos = [
  { id: 1, nombre: 'John Deere', assigned: true, reportes: 5 },
  { id: 2, nombre: 'DevelopMX', assigned: false, reportes: 0 },
  { id: 3, nombre: 'Milwuakee', assigned: true, reportes: 8 },
  { id: 4, nombre: 'Chepina', assigned: false, reportes: 1 },
  { id: 5, nombre: 'Caterpillar', assigned: false, reportes: 5 },
  { id: 6, nombre: 'Lala', assigned: true, reportes: 0 },
];

const mockStudents = [
  { id: '1', name: 'John Doe', career: 'Computer Science' },
  { id: '2', name: 'Jane Smith', career: 'Engineering' },
];

const mockAdvisors = [
  { id: '1', name: 'Dr. Brown' },
  { id: '2', name: 'Prof. Wilson' },
];

export default function ProjectTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    reportes: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      global: { ...prevFilters.global, value },
    }));
    setGlobalFilterValue(value);
  };

  const statusBodyTemplate = (data) => {
    console.log(data);
    const isAssigned = data.assigned;

    return (
      <div>
        <Stack alignItems="center" direction="row">
          <Tag
            value={isAssigned ? 'Asignado' : 'Sin Asignar'}
            severity={isAssigned ? 'success' : 'danger'}
          />
          <div style={{ marginLeft: 10 }}></div>
        </Stack>
      </div>
    );
  };

  const reportBodyTemplate = (data) => {
    return (
      <Button
        label={`${data.reportes} Reportes`}
        severity="secondary"
        text
        icon="pi pi-folder"
        onClick={() => alert('Mandar a pág reporte')}
      />
    );
  };

  const menu = useRef(null);

  const optionsBodyTemplate = (data) => {
    const items = [
      { label: 'Asignar reporte', icon: 'pi pi-file' },
      { label: 'Modificar', icon: 'pi pi-pencil' },
      { label: 'Eliminar', icon: 'pi pi-trash' },
    ];

    return (
      <Button
        icon="pi pi-ellipsis-v"
        text
        onClick={(e) => menu.current.toggle(e)}
      >
        <Menu model={items} popup ref={menu} />
      </Button>
    );
  };

  const startContent = (
    <Button
      label="Nuevo Proyecto"
      icon="pi pi-plus"
      severity="success"
      onClick={handleModalOpen}
    />
  );

  return (
    <>
      <Toolbar start={startContent} className="mb-4" />
      <DataTable
        value={proyectos}
        paginator
        removableSort
        rows={5}
        emptyMessage="No se encontraron proyectos."
        filters={filters}
        filterDisplay="row"
        globalFilterFields={['nombre', 'email', 'role']}
      >
        <Column
          header="Testing"
          style={{ width: '40%' }}
          field="nombre"
          filter
        ></Column>
        <Column
          header="Estatus"
          style={{ width: '30%' }}
          field="assigned"
          body={statusBodyTemplate}
          filter
          filterElement={StatusFilterTemplate}
          showFilterMenu={false}
        ></Column>
        <Column
          header="Reportes"
          style={{ width: '20%' }}
          body={reportBodyTemplate}
        ></Column>
        <Column
          header="Más"
          style={{ width: '10%' }}
          body={optionsBodyTemplate}
        ></Column>
      </DataTable>

      <ProjectModal
        open={isModalOpen}
        handleClose={handleModalClose}
        students={mockStudents}
        advisors={mockAdvisors}
      />
    </>
  );
}