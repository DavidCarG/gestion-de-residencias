import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Menu } from "primereact/menu";
import { Tag } from "primereact/tag";
import { useRef, useState } from "react";
import { Dialog } from 'primereact/dialog';
import { deleteProject, updateProject } from "../../api/projects";
import NewProjectModal from "./NewProjectModal";

export const ReportBodyTemplate = (data) => {
    return (
        <Button
            label={`${data.reportCount} Reportes`}
            severity='secondary'
            text
            icon="pi pi-folder"
            onClick={() => alert("Mandar a pág reporte")}
        />
    );
};

const handleModify = (id, project) => {
    updateProject(id, project);
}

const handleDelete = (id) => {
    deleteProject(id);
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
        { label: 'Asignar reporte', icon: 'pi pi-file' },
        { label: 'Modificar', icon: 'pi pi-pencil', command: () => handleModalOpen()},
        { label: 'Eliminar', icon: 'pi pi-trash', command: () => confirmDelete(rowData._id) }
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
                        <Button label="No" icon="pi pi-times" onClick={() => setDeleteDialogVisible(false)} className="p-button-text" />
                        <Button label="Sí" icon="pi pi-check" onClick={onDeleteConfirmed} autoFocus />
                    </div>
                }
                onHide={() => setDeleteDialogVisible(false)}
            >
                <p>¿Está seguro de que desea eliminar este proyecto?</p>
            </Dialog>
            <NewProjectModal open={isModalOpen} handleClose={handleModalClose} handleSave={handleModify} data={rowData}/>
        </>
    );
}

const statuses = [true, false];

const getSeverity = (assigned) => {
    return assigned ? 'success' : 'danger';
};

export const StatusBodyTemplate = (rowData) => {
    return (
        <Tag value={rowData.assigned ? 'asignado' : 'sin asignar'} severity={getSeverity(rowData.assigned)} />
    );
};

export const StatusItemTemplate = (option) => {
    if (option === null) {
        return <span>seleccionar</span>;
    }
    return <Tag value={option ? 'asignado' : 'sin asignar'} severity={getSeverity(option)} />;
};

export const ValueItemTemplate = (option) => {
    if (option === null) {
        return <span>seleccionar</span>;
    }
    return <Tag value={option ? 'asignado' : 'sin asignar'} severity={getSeverity(option)} />;
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
