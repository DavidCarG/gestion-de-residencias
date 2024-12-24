import { useState } from "react";
import { deleteUser, updateUser } from "../../../api/users";
import { useRef } from "react";

import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Dialog } from "primereact/dialog";
import UserModal from "../Modals/NewUserModal";

const handleModify = (id, user) => {
  updateUser(id, user);
};

const handleDelete = (id) => {
  deleteUser(id);
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

  const items = [
    {
      label: "Modificar",
      icon: "pi pi-pencil",
      command: () => handleModalOpen(),
    },
    {
      label: "Eliminar",
      icon: "pi pi-trash",
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
        style={{ width: "350px" }}
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
        handleSave={handleModify}
        data={rowData}
      />
    </>
  );
};
