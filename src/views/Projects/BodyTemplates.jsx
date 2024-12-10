import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Menu } from 'primereact/menu';
import { Tag } from 'primereact/tag';
import { useRef } from 'react';

export const ReportBodyTemplate = (data) => {
  return (
    <Button
      label={`${data.reports} Reportes`}
      severity="secondary"
      text
      icon="pi pi-folder"
      onClick={() => alert('Mandar a pág reporte')}
    />
  );
};

export const OptionsBodyTemplate = () => {
  const items = [
    { label: 'Asignar reporte', icon: 'pi pi-file' },
    { label: 'Modificar', icon: 'pi pi-pencil' },
    { label: 'Eliminar', icon: 'pi pi-trash' },
  ];

  const menu = useRef(null);

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

const statuses = [true, false];

const getSeverity = (status) => {
  return status === true ? 'success' : 'danger';
};

export const StatusBodyTemplate = (rowData) => {
  return (
    <Tag
      value={rowData.assigned === true ? 'Asignado' : 'Sin Asignar'}
      severity={getSeverity(rowData.assigned)}
    />
  );
};

export const StatusItemTemplate = (option) => {
  return (
    <Tag
      value={option === true ? 'Asignado' : 'Sin Asignar'}
      severity={getSeverity(option)}
    />
  );
};

export const StatusFilterTemplate = (options) => {
  return (
    <Dropdown
      value={options.value}
      options={statuses}
      onChange={(e) => options.filterApplyCallback(e.value)}
      itemTemplate={StatusItemTemplate}
      placeholder="Filtrar por estatus"
      className="p-column-filter"
      showClear
      style={{ minWidth: '12rem' }}
    />
  );
};
