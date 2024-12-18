import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Menu } from 'primereact/menu';
import { Tag } from 'primereact/tag';
import { useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { deleteProject, updateProject } from '../../api/projects';
import NewProjectModal from './NewProjectModal';

export const ReportBodyTemplate = (data) => {
  return (
    <Button
      label={`${data.reportCount} Reportes`}
      severity="secondary"
      text
      icon="pi pi-folder"
      onClick={() => alert('Mandar a pág reporte')}
    />
  );
};

const statuses = [true, false];

const getSeverity = (assigned) => {
  return assigned ? 'success' : 'danger';
};

export const StatusBodyTemplate = (rowData) => {
  return (
    <Tag
      value={rowData.assigned ? 'asignado' : 'sin asignar'}
      severity={getSeverity(rowData.assigned)}
    />
  );
};

export const StatusItemTemplate = (option) => {
  if (option === null) {
    return <span>seleccionar</span>;
  }
  return (
    <Tag
      value={option ? 'asignado' : 'sin asignar'}
      severity={getSeverity(option)}
    />
  );
};

export const ValueItemTemplate = (option) => {
  if (option === null) {
    return <span>seleccionar</span>;
  }
  return (
    <Tag
      value={option ? 'asignado' : 'sin asignar'}
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
      valueTemplate={ValueItemTemplate}
      placeholder="Filtrar por estatus"
      className="p-column-filter"
      showClear
      style={{ minWidth: '12rem' }}
    />
  );
};
