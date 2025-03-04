import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Menu } from 'primereact/menu';
import { useRef, useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from 'primereact/inputtext';
import NewProjectModal from '../Modals/NewProjectModal';
import {
    deleteProject,
    fetchProjects,
    updateProject,
} from '../../../api/projects';
import { fetchUserById, fetchUsers } from '../../../api/users';
import { createReport } from '../../../api/reports';
import { useProjectsContext } from '../../../context/Projects';

// Handlers for project operations
const handleModify = async (id, project) => {
    await updateProject(id, project);
};

const handleDelete = async (id) => {
    await deleteProject(id);
};

const handleCreateReport = async (report) => {
    await createReport(report);
};

export const OptionsBodyTemplate = (rowData) => {
    const { updateTableData } = useProjectsContext();

    // State for modals and dialogs
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [assignUserModalOpen, setAssignUserModalOpen] = useState(false);

    // State for report creation
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [link, setLink] = useState('');

    // State for user assignment
    const [selectedUsers, setSelectedUsers] = useState([]);

    // Fetch users for report and assignment modals
    useEffect(() => {
        fetchUsers().then(setUsers);
    }, []);

    // Handlers for opening and closing modals
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleReportModalOpen = () => setReportModalOpen(true);
    const handleReportModalClose = () => setReportModalOpen(false);

    const handleAssignUserModalOpen = () => {
        const assigneePromises = rowData.assignees.map((id) =>
            fetchUserById(id)
        );
        Promise.all(assigneePromises).then(setSelectedUsers);
        setAssignUserModalOpen(true);
    };
    const handleAssignUserModalClose = () => setAssignUserModalOpen(false);

    const updateTable = async () => {
        const newData = await fetchProjects();
        updateTableData(newData);
    };

    // Handlers for confirming actions
    const confirmDelete = (id) => {
        setSelectedId(id);
        setDeleteDialogVisible(true);
    };

    const onDeleteConfirmed = async () => {
        await handleDelete(selectedId);
        await updateTable();
        setDeleteDialogVisible(false);
    };

    const handleSaveReport = async () => {
        await handleCreateReport({
            userId: selectedUser._id,
            projectId: rowData._id,
            link,
        });
        await updateTable();
        handleReportModalClose();
    };

    const handleAssignUsers = async () => {
        await handleModify(rowData._id, {
            assigned: true,
            assignees: selectedUsers.map((user) => user._id),
        });
        await updateTable();
        handleAssignUserModalClose();
    };

    // Menu items for project options
    const items = [
        {
            label: 'Asignar reporte',
            icon: 'pi pi-file',
            command: () => handleReportModalOpen(),
        },
        {
            label: 'Asignar usuario',
            icon: 'pi pi-user',
            command: () => handleAssignUserModalOpen(),
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

            {/* Delete Confirmation Dialog */}
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

            {/* New Project Modal */}
            <NewProjectModal
                open={isModalOpen}
                handleClose={handleModalClose}
                data={rowData}
            />

            {/* Report Creation Dialog */}
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
                <InputText
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Ingrese el enlace"
                    style={{ width: '100%', marginTop: '1rem' }}
                />
            </Dialog>

            {/* User Assignment Dialog */}
            <Dialog
                header="Asignar Usuario"
                visible={assignUserModalOpen}
                style={{ width: '450px' }}
                footer={
                    <div>
                        <Button
                            label="Cancelar"
                            icon="pi pi-times"
                            onClick={handleAssignUserModalClose}
                            className="p-button-text"
                        />
                        <Button
                            label="Guardar"
                            icon="pi pi-check"
                            onClick={handleAssignUsers}
                            autoFocus
                        />
                    </div>
                }
                onHide={handleAssignUserModalClose}
            >
                <MultiSelect
                    value={selectedUsers}
                    options={users}
                    onChange={(e) => setSelectedUsers(e.value)}
                    optionLabel="name"
                    placeholder="Seleccione usuarios"
                    style={{ width: '100%' }}
                />
            </Dialog>
        </>
    );
};
