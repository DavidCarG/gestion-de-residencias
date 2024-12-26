import { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';

import ReportModal from '../NewReportModal';
import { deleteReport, fetchReports, updateReport } from '../../../api/reports';
import { useReportsContext } from '../../../context/Reports';

const handleModify = (id, report) => {
    updateReport(id, report);
};

const handleDelete = async (id) => {
    await deleteReport(id);
};

export const OptionsBodyTemplate = (rowData) => {
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { updateTableData } = useReportsContext();

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const confirmDelete = (id) => {
        setSelectedId(id);
        setDeleteDialogVisible(true);
    };

    const onDeleteConfirmed = async () => {
        await handleDelete(selectedId);
        const newData = await fetchReports();
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
            command: () => confirmDelete(rowData.reportId),
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
                <p>¿Está seguro de que desea eliminar este reporte?</p>
            </Dialog>
            <ReportModal
                open={isModalOpen}
                handleClose={handleModalClose}
                handleSave={handleModify}
                data={rowData}
            />
        </>
    );
};
