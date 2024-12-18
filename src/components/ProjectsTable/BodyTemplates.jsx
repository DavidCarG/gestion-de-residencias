import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Menu } from 'primereact/menu';
import { useRef, useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import {
  deleteProject,
  updateProject,
  fetchProjects,
} from '../../api/projects';
import { fetchUsers } from '../../api/users';
import { createReport } from '../../api/reports';
import { InputText } from 'primereact/inputtext';
import NewProjectModal from './NewProjectModal';

const handleModify = (id, project) => {
  updateProject(id, project);
};

const handleDelete = (id) => {
  deleteProject(id);
};

const handleCreateReport = (report) => {
  createReport(report);
};

export const OptionsBodyTemplate = (rowData) => {
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const confirmDelete = (id) => {
    setSelectedId(id);
    setDeleteDialogVisible(true);
  };

  const onDeleteConfirmed = () => {
    handleDelete(selectedId);
    setDeleteDialogVisible(false);
  };

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [link, setLink] = useState('');

  useEffect(() => {
    fetchUsers().then(setUsers);
    fetchProjects().then(setProjects);
  }, []);

  const handleReportModalOpen = () => setReportModalOpen(true);
  const handleReportModalClose = () => setReportModalOpen(false);

  const handleSaveReport = () => {
    handleCreateReport({
      userId: selectedUser._id,
      projectId: selectedProject._id,
      link,
    });
    handleReportModalClose();
  };

  const items = [
    {
      label: 'Asignar reporte',
      icon: 'pi pi-file',
      command: () => handleReportModalOpen(),
    },
    {
      label: 'Modificar',
      icon: 'pi pi-pencil',
      command: () => handleModalOpen(),
    },
    {
      label: 'Eliminar',
      icon: 'pi pi-trash',
      command: () => confirmDelete(rowData._id),
    },
  ];

  const menu = useRef(null);

  return (
    <>
      <Button
        icon="pi pi-ellipsis-v"
        text
        onClick={(e) => menu.current.toggle(e)}
      >
        <Menu model={items} popup ref={menu} />
      </Button>
      <Dialog
        header="Confirmar eliminación"
        visible={deleteDialogVisible}
        style={{ width: '350px' }}
        footer={
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              onClick={() => setDeleteDialogVisible(false)}
              className="p-button-text"
            />
            <Button
              label="Sí"
              icon="pi pi-check"
              onClick={onDeleteConfirmed}
              autoFocus
            />
          </div>
        }
        onHide={() => setDeleteDialogVisible(false)}
      >
        <p>¿Está seguro de que desea eliminar este proyecto?</p>
      </Dialog>
      <NewProjectModal
        open={isModalOpen}
        handleClose={handleModalClose}
        handleSave={handleModify}
        data={rowData}
      />
      <Dialog
        header="Asignar Reporte"
        visible={reportModalOpen}
        style={{ width: '450px' }}
        footer={
          <div>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={handleReportModalClose}
              className="p-button-text"
            />
            <Button
              label="Guardar"
              icon="pi pi-check"
              onClick={handleSaveReport}
              autoFocus
            />
          </div>
        }
        onHide={handleReportModalClose}
      >
        <Dropdown
          value={selectedUser}
          options={users}
          onChange={(e) => setSelectedUser(e.value)}
          optionLabel="name"
          placeholder="Seleccione un usuario"
          style={{ width: '100%' }}
        />
        <Dropdown
          value={selectedProject}
          options={projects}
          onChange={(e) => setSelectedProject(e.value)}
          optionLabel="projectName"
          placeholder="Seleccione un proyecto"
          style={{ width: '100%', marginTop: '1rem' }}
        />
        <InputText
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Ingrese el enlace"
          style={{ width: '100%', marginTop: '1rem' }}
        />
      </Dialog>
    </>
  );
};
