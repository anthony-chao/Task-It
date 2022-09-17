import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { BiEditAlt, BiTrashAlt } from "react-icons/bi";
import folder from "../../assets/images/folder.png";

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
    deleteButton: {
      paddingRight: 30,
      color: "black",
      opacity: 0.75,
    },
    updateButton: {
      paddingRight: 15,
      color: "black",
      opacity: 0.75,
    },
    size: 18,
    input: {
      name: {
        paddingLeft: 10,
        margin: 5,
        textTransform: "capitalize",
        fontWeight: 500,
        fontSize: 20,
      },
      description: {
        paddingLeft: 10,
        margin: 5,
        fontSize: 12,
      },
    },
  };

  return (
    <>
      <div className="img-container">
        <img src={folder} alt="folder" />
        <div className="project-index-item">
          {/* <p>Testing testing testing</p> */}
          <div className="project-info">
            <ul>
              <li>
                <p className="project-text">Project Name:</p>
                <p className="project-input" style={styles.input.name}>
                  {name}
                </p>
              </li>
              <li>
                <p className="project-text">Description:</p>
                <p className="project-input" style={styles.input.description}>
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
                style={styles.updateButton}
                onClick={handleUpdateClick}
              />
              <BiTrashAlt
                id="proj-icon"
                size={styles.size}
                style={styles.deleteButton}
                onClick={handleDeleteClick}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsIndexItem;
