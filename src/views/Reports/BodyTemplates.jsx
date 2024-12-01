import { Button } from "primereact/button";


export const LinkBodyTemplate = (rowData) => {
    return (
        <Button
            icon="pi pi-external-link"
            rounded
            outlined
            aria-label="reportes"
            link onClick={() => window.open('https://react.dev', '_blank')}
        />
    );
}