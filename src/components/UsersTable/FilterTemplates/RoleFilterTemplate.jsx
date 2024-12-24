import { Dropdown } from "primereact/dropdown";
import { roleMap } from "../consts";

const roles = [
  "jefe_academico",
  "profesor",
  "presidente_academia",
  "coordinador_carrera",
  "estudiante",
];

export const RoleItemTemplate = (option) => {
  if (option === null) {
    return <span>seleccionar</span>;
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        className="p-tag p-tag-rounded"
        style={{
          backgroundColor: roleMap[option].color,
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          fontSize: "0.75rem",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        {roleMap[option].label}
      </span>
    </div>
  );
};

const RoleFilterTemplate = (options) => {
  return (
    <Dropdown
      value={options.value}
      options={roles}
      onChange={(e) => options.filterApplyCallback(e.value)}
      itemTemplate={RoleItemTemplate}
      valueTemplate={RoleItemTemplate}
      placeholder="Select One"
      className="p-column-filter"
      showClear
    />
  );
};

export default RoleFilterTemplate;
