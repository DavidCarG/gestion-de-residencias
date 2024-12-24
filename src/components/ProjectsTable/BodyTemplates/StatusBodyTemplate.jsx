import { Tag } from "primereact/tag";
import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";
import { fetchUserById } from "../../../api/users";

const getSeverity = (assigned) => {
  return assigned ? "success" : "danger";
};

export const StatusBodyTemplate = (rowData) => {
  const [assigneesDialogVisible, setAssigneesDialogVisible] = useState(false);
  const [assignees, setAssignees] = useState([]);

  useEffect(() => {
    if (rowData.assignees.length > 0) {
      Promise.all(rowData.assignees.map((id) => fetchUserById(id))).then(
        setAssignees
      );
    }
  }, [rowData.assignees]);

  const handleAssigneesDialogOpen = () => setAssigneesDialogVisible(true);
  const handleAssigneesDialogClose = () => setAssigneesDialogVisible(false);

  const displayedAssignees = assignees.slice(0, 3);
  const remainingAssignees = assignees.length - displayedAssignees.length;

  return (
    <>
      <div onClick={handleAssigneesDialogOpen} style={{ cursor: "pointer" }}>
        <Tag
          value={rowData.assigned ? "asignado" : "sin asignar"}
          severity={getSeverity(rowData.assigned)}
        />
        {displayedAssignees.length > 0 && (
          <div style={{ display: "flex", marginTop: "0.5rem" }}>
            {displayedAssignees.map((assignee) => (
              <Avatar
                key={assignee._id}
                label={assignee.name.charAt(0)}
                shape="circle"
                style={{ marginRight: "0.5rem" }}
              />
            ))}
            {remainingAssignees > 0 && (
              <Avatar
                label={`+${remainingAssignees}`}
                shape="circle"
                style={{ marginRight: "0.5rem" }}
              />
            )}
          </div>
        )}
      </div>
      <Dialog
        header="Asignados"
        visible={assigneesDialogVisible}
        style={{ width: "450px" }}
        onHide={handleAssigneesDialogClose}
      >
        <ul>
          {assignees.map((assignee) => (
            <li key={assignee._id}>{assignee.name}</li>
          ))}
        </ul>
      </Dialog>
    </>
  );
};

export const StatusItemTemplate = (option) => {
  if (option === null) {
    return <span>seleccionar</span>;
  }
  return (
    <Tag
      value={option ? "asignado" : "sin asignar"}
      severity={getSeverity(option)}
    />
  );
};
