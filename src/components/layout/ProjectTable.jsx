import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Avatar, Stack } from '@mui/material';
import { useRef } from 'react';

const proyectos = [
    { id: 1, nombre: "John Deere",  asignado: "",  reportes: 5 },
    { id: 2, nombre: "DevelopMX",   asignado: "",  reportes: 0 },
    { id: 3, nombre: "Milwuakee",   asignado: "",  reportes: 8 },
    { id: 4, nombre: "Chepina",     asignado: "",  reportes: 1 },
    { id: 5, nombre: "Caterpillar", asignado: "",  reportes: 5 },
    { id: 6, nombre: "Lala",        asignado: "",  reportes: 0 },
];

export default function ProjectTable(){
    const statusBodyTemplate = (data) => {
        const isAssigned = data.reportes !== 0;
    
        return (
            <div>
                <Stack
                    alignItems="center"
                    direction="row"
                >
                    <Tag 
                        value={isAssigned > 0 ? 'Asignado' : 'Sin Asignar'} 
                        severity={isAssigned > 0 ? 'success' : 'danger'}
                    />
                    <div style={{marginLeft: 10}}></div>
    
                    {Array.from({ length: Math.min(data.reportes, 3) }, (_, index) => (
                        <Avatar src="/images/koruw.png" sx={{width: 20, height:20}}/>
                    ))}
                </Stack>
            </div>
        );
    };

    const reportBodyTemplate = (data) => {
        return (
            <Button
                label={`${data.reportes} Reportes`}
                severity='secondary'
                text
                icon="pi pi-folder"
                onClick={() => alert("Mandar a pág reporte")}
            />
        );
    };

    const menu = useRef(null);

    const optionsBodyTemplate = (data) => {
        const items = [
            { label: 'Asignar reporte', icon: 'pi pi-file'},
            { label: 'Modificar',       icon: 'pi pi-pencil'},
            { label: 'Eliminar',        icon: 'pi pi-trash'}
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
    }

    return(
        <DataTable value={proyectos}>
            <Column header="Nombre"     style={{width: '40%'}}  field='nombre'></Column>
            <Column header="Estatus"    style={{width: '30%'}}  body={statusBodyTemplate}></Column>
            <Column header="Reportes"   style={{width: '20%'}}  body={reportBodyTemplate}></Column>
            <Column header="Más"        style={{width: '10%'}}  body={optionsBodyTemplate}></Column>
        </DataTable>
    );
}