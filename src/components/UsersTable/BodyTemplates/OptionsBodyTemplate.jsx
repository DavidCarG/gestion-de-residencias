import { useState, useRef } from 'react';
import { deleteUser, fetchUsers } from '../../../api/users';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import UserModal from '../Modals/NewUserModal';
import { useUsersContext } from '../../../context/Users';

const handleDelete = (id) => deleteUser(id);

export const OptionsBodyTemplate = (rowData) => {
    const { updateTableData } = useUsersContext();
    const toast = useRef(null);
    const menu = useRef(null);

    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showInfo = (msg) => {
        toast.current.show({
            severity: 'info',
            summary: 'Exito',
            detail: msg,
            life: 3000,
        });
    };

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const confirmDelete = (id) => {
        setSelectedId(id);
        setDeleteDialogVisible(true);
    };

    const onDeleteConfirmed = async () => {
        const response = await handleDelete(selectedId);
        showInfo(response.data.message);

        const newData = await fetchUsers();
        updateTableData(newData);

        setDeleteDialogVisible(false);
    };

    const items = [
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

    return (
        <>
            <Toast ref={toast} />
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
            <UserModal
                open={isModalOpen}
                handleClose={handleModalClose}
                data={rowData}
            />
        </>
    );
};
