import { roleMap } from "../consts";

export const RoleBodyTemplate = (rowData) => {
    
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <span
                className="p-tag p-tag-rounded"
                style={{
                    backgroundColor: roleMap[rowData.role].color,
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                }}
            >
                {roleMap[rowData.role].label}
            </span>
        </div>
    );       
}