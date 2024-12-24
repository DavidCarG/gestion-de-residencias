import { Button } from "primereact/button";

export const ReportBodyTemplate = (data) => {
  return (
    <Button
      label={`${data.reportCount} Reportes`}
      severity="secondary"
      text
      icon="pi pi-folder"
      onClick={() => alert("Mandar a pág reporte")}
    />
  );
};
