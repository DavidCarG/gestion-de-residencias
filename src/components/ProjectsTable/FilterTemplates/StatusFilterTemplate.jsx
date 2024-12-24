import { Dropdown } from "primereact/dropdown";
import { StatusItemTemplate } from "../BodyTemplates/StatusBodyTemplate";

const statuses = [true, false];

export const StatusFilterTemplate = (options) => {
  return (
    <Dropdown
      value={options.value}
      options={statuses}
      onChange={(e) => options.filterApplyCallback(e.value)}
      itemTemplate={StatusItemTemplate}
      valueTemplate={StatusItemTemplate}
      placeholder="Filtrar por estatus"
      className="p-column-filter"
      showClear
      style={{ minWidth: "12rem" }}
    />
  );
};
