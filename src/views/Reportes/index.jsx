import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Box } from '@mui/material';
import { FilterMatchMode } from 'primereact/api';
import { LinkBodyTemplate } from './BodyTemplates';

const REPORTS = [
    { author: 'Juan Perez', project: 'John Deere', link: 'https://www.google.com', date: '2023-11-10' },
    { author: 'Carlos Sanchez', project: 'John Deere', link: 'https://www.example.com', date: '2022-07-12' },
    { author: 'Ana Martinez', project: 'John Deere', link: 'https://www.example.com', date: '2021-09-15' },
    { author: 'Luis Rodriguez', project: 'John Deere', link: 'https://www.example.com', date: '2020-06-20' },
    { author: 'Sofia Fernandez', project: 'John Deere', link: 'https://www.example.com', date: '2022-03-03' },

    { author: 'Laura Ramirez', project: 'DevelopMX', link: 'https://www.example.com', date: '2023-12-14' },
    { author: 'Jorge Lopez', project: 'DevelopMX', link: 'https://www.example.com', date: '2021-05-25' },
    { author: 'Elena Diaz', project: 'DevelopMX', link: 'https://www.example.com', date: '2020-08-30' },
    { author: 'Daniel Alvarez', project: 'DevelopMX', link: 'https://www.example.com', date: '2022-11-03' },
    { author: 'Victor Ramirez', project: 'DevelopMX', link: 'https://www.example.com', date: '2022-02-18' },
    { author: 'Oscar Gonzalez', project: 'DevelopMX', link: 'https://www.example.com', date: '2021-01-12' },
    { author: 'Patricia Navarro', project: 'DevelopMX', link: 'https://www.example.com', date: '2023-06-06' },
    { author: 'Francisco Torres', project: 'DevelopMX', link: 'https://www.example.com', date: '2020-11-25' },
    { author: 'Camila Fernandez', project: 'DevelopMX', link: 'https://www.example.com', date: '2021-07-16' },

    { author: 'Ricardo Castillo', project: 'Milwuakee', link: 'https://www.example.com', date: '2021-11-12' },
    { author: 'Hector Ponce', project: 'Milwuakee', link: 'https://www.example.com', date: '2022-04-20' },

    { author: 'Ana Martinez', project: 'Chepina', link: 'https://www.example.com', date: '2022-01-15' },

    { author: 'Sofia Fernandez', project: 'Caterpillar', link: 'https://www.example.com', date: '2022-03-30' },
    { author: 'Miguel Torres', project: 'Caterpillar', link: 'https://www.example.com', date: '2021-09-05' },

    { author: 'Laura Ramirez', project: 'Lala', link: 'https://www.example.com', date: '2023-05-15' },

    { author: 'Jorge Lopez', project: 'Soriana', link: 'https://www.example.com', date: '2021-12-11' },
    { author: 'Elena Diaz', project: 'Soriana', link: 'https://www.example.com', date: '2023-02-20' },
    { author: 'Daniel Alvarez', project: 'Soriana', link: 'https://www.example.com', date: '2022-08-01' },
    { author: 'Paola Hernandez', project: 'Soriana', link: 'https://www.example.com', date: '2023-04-07' },

    { author: 'Juan Perez', project: 'Grupo Bimbo', link: 'https://www.example.com', date: '2022-07-25' },
    { author: 'Carlos Sanchez', project: 'Grupo Bimbo', link: 'https://www.example.com', date: '2021-03-17' },
    { author: 'Ana Martinez', project: 'Grupo Bimbo', link: 'https://www.example.com', date: '2020-09-10' },
    { author: 'Luis Rodriguez', project: 'Grupo Bimbo', link: 'https://www.example.com', date: '2021-10-05' },

    { author: 'Miguel Torres', project: 'Cervecería Modelo', link: 'https://www.example.com', date: '2021-11-15' },
    { author: 'Sofia Fernandez', project: 'Cervecería Modelo', link: 'https://www.example.com', date: '2022-05-03' },

    { author: 'Laura Ramirez', project: 'Cemex', link: 'https://www.example.com', date: '2023-08-10' },
    { author: 'Jorge Lopez', project: 'Cemex', link: 'https://www.example.com', date: '2021-09-22' },
    { author: 'Elena Diaz', project: 'Cemex', link: 'https://www.example.com', date: '2020-12-15' },
    { author: 'Carlos Sanchez', project: 'Cemex', link: 'https://www.example.com', date: '2022-04-02' },
    { author: 'Ana Martinez', project: 'Cemex', link: 'https://www.example.com', date: '2021-06-07' },

    { author: 'Victor Ramirez', project: 'Nemak', link: 'https://www.example.com', date: '2022-07-20' },
    { author: 'Hector Ponce', project: 'Nemak', link: 'https://www.example.com', date: '2023-03-15' },
    { author: 'Roberto Cruz', project: 'Nemak', link: 'https://www.example.com', date: '2021-12-10' },
    { author: 'Ricardo Castillo', project: 'Nemak', link: 'https://www.example.com', date: '2022-11-30' },
    { author: 'Andrea Ruiz', project: 'Nemak', link: 'https://www.example.com', date: '2020-05-06' },

    { author: 'Francisco Torres', project: 'Grupo Alfa', link: 'https://www.example.com', date: '2023-02-15' },

    { author: 'Valeria Mejia', project: 'Femsa', link: 'https://www.example.com', date: '2023-01-18' },
    { author: 'Patricia Navarro', project: 'Femsa', link: 'https://www.example.com', date: '2022-12-10' },
    { author: 'Carlos Sanchez', project: 'Femsa', link: 'https://www.example.com', date: '2021-04-30' },
    { author: 'Sofia Fernandez', project: 'Femsa', link: 'https://www.example.com', date: '2021-08-22' },

    { author: 'Juan Perez', project: 'Coca-Cola FEMSA', link: 'https://www.example.com', date: '2022-06-05' },
    { author: 'Jorge Lopez', project: 'Coca-Cola FEMSA', link: 'https://www.example.com', date: '2021-11-12' },
    { author: 'Elena Diaz', project: 'Coca-Cola FEMSA', link: 'https://www.example.com', date: '2023-02-25' },

    { author: 'Luis Rodriguez', project: 'Televisa', link: 'https://www.example.com', date: '2022-10-10' },
    { author: 'Paola Hernandez', project: 'Televisa', link: 'https://www.example.com', date: '2023-03-01' },
    { author: 'Miguel Torres', project: 'Televisa', link: 'https://www.example.com', date: '2020-12-28' },
    { author: 'Carlos Sanchez', project: 'Televisa', link: 'https://www.example.com', date: '2021-07-16' },
    { author: 'Andrea Ruiz', project: 'Televisa', link: 'https://www.example.com', date: '2021-02-25' },
];


const ReportsView = () => {
    const [filters, setFilters] = useState({
        author: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        project: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    return (
        <Box>
            <DataTable
                value={REPORTS}
                stripedRows
                paginator
                removableSort
                rows={7}
                size='small'
                filters={filters}
                onFilter={(e) => setFilters(e.filters)}
                filterDisplay='row'
                globalFilterFields={['nombre', 'email', 'role']}
                emptyMessage="No se encontraron usuarios."
            >
                <Column header="Autor" filter filterPlaceholder="Buscar por autor" sortable style={{ width: '40%' }} field='author'></Column>
                <Column header="Proyecto" filter filterPlaceholder="Buscar por proyecto" sortable style={{ width: '30%' }} field='project'></Column>
                <Column header="Fecha" sortable style={{ width: '20%' }} field='date'></Column>
                <Column
                    style={{ width: '10%' }}
                    field='link'
                    body={LinkBodyTemplate}
                />
            </DataTable>
        </Box>
    );
}

export default ReportsView;