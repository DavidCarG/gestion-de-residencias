import { Button } from "primereact/button";
import PropTypes from 'prop-types';

export const LinkBodyTemplate = (rowData) => {
    return (
        <Button
            icon="pi pi-external-link"
            rounded
            outlined
            aria-label="reportes"
            link onClick={() => window.open(rowData.link, '_blank')}
        />
    );
}

LinkBodyTemplate.propTypes = {
    rowData: PropTypes.object.isRequired
};