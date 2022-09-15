import React, { useEffect } from "react";
import { useHistory } from "react-router";
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

  const history = useHistory();

  const handleClickProject = () => {
    return history.push(`/projects/${project._id}`);
  };

  const styles = {
    actionButton: {
      paddingRight: 10,
      color: "green",
    },
    size: 16,
    input: {
      fontSize: "14",
      paddingLeft: 10,
      // textIndent: 10,
      // fontWeight: "bold",
      // color: "black",
    },
  };

  return (
    <div className="project-index-item">
      <div className="project-info">
        <ul>
          <li>
            <p className="project-text">Project Name:</p>
            <p className="project-input" style={styles.input}>
              {name}
            </p>
          </li>
          <li>
            <p className="project-text">Description:</p>
            <p className="project-input" style={styles.input}>
              {description}
            </p>
          </li>
        </ul>
      </div>

      <div className="project-action-buttons">
        <div className="project-tasks-button" onClick={handleClickProject}>
          <p>see tasks</p>
        </div>

        <div>
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
    </div>
  );
};

export default ProjectsIndexItem;
