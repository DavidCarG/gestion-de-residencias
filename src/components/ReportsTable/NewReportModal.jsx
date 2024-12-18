import { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { fetchUsers } from '../../api/users';
import { fetchProjects } from '../../api/projects';

const NewReportModal = ({ open, handleClose, handleSave, data }) => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [link, setLink] = useState(data?.link || '');

  useEffect(() => {
    fetchUsers().then(setUsers);
    fetchProjects().then(setProjects);
  }, []);

  useEffect(() => {
    if (data) {
      setSelectedUser(users.find((user) => user._id === data.userId));
      setSelectedProject(
        projects.find((project) => project._id === data.projectId),
      );
    }
  }, [data, users, projects]);

  const onSave = () => {
    console.log('report', data);
    handleSave(data?.reportId, {
      userId: selectedUser._id,
      projectId: selectedProject._id,
      link,
    });
    handleClose();
  };

  return (
    <Dialog
      header="Asignar Reporte"
      visible={open}
      style={{ width: '450px' }}
      footer={
        <div>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={handleClose}
            className="p-button-text"
          />
          <Button
            label="Guardar"
            icon="pi pi-check"
            onClick={onSave}
            autoFocus
          />
        </div>
      }
      onHide={handleClose}
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
  );
};

export default NewReportModal;
