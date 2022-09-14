import React, { useEffect } from "react";
import { BiEditAlt, BiTrashAlt } from "react-icons/bi";

const ProjectsIndexItem = ({ project, openModal }) => {
  const { name, description } = project;

  const handleUpdateClick = () => {
    openModal({
      type: "updateProject",
      project: project,
    });
  };

  const handleDeleteClick = () => {
    openModal({
      type: "deleteProject",
      projectId: project._id,
    });
  };

  const styles = {
    actionButton: {
      paddingRight: 10,
      paddingBottom: 10,
      color: "green",
    },
    size: 16,
  };

  return (
    <div className="project-index-item">
      <div className="project-info">
        <ul>
          <li className="project-name">Project Name: {name}</li>
          <li className="project-desc">Description: {description}</li>
        </ul>
      </div>

      <div className="update-delete-buttons">
        <BiEditAlt
          id="proj-icon"
          size={styles.size}
          style={styles.actionButton}
          onClick={handleUpdateClick}
        />
        <BiTrashAlt
          id="proj-icon"
          size={styles.size}
          style={styles.actionButton}
          onClick={handleDeleteClick}
        />
      </div>
    </div>
  );
};

export default ProjectsIndexItem;
