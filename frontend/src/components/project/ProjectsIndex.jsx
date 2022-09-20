import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProjects } from "../../actions/projectActions";
import ProjectsIndexItem from "./ProjectsIndexItem";
import { FiFolderPlus } from "react-icons/fi";
import { openModal } from "../../actions/modalActions";

const ProjectsIndex = ({ projects, fetchProjects, openModal }) => {
  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateClick = () => {
    openModal({
      type: "createProject",
    });
  };

  return (
    <div className="main-container">
      <main className="projects-index-container">
        <div className="create-button">
          <p onClick={handleCreateClick}>
            Create a Project
            <FiFolderPlus
              size={25}
              style={{
                color: "black",
                opacity: 0.75,
                paddingLeft: 10,
              }}
            />
          </p>
        </div>

        <div className="projects-index-grid">
          {projects.map((project, index) => (
            <ProjectsIndexItem
              key={index}
              project={project}
              openModal={openModal}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

const mSTP = (state) => {
  return {
    projects: Object.values(state.entities.projects),
  };
};

const mDTP = (dispatch) => {
  return {
    fetchProjects: () => dispatch(fetchProjects()),
    openModal: (formType) => dispatch(openModal(formType)),
  };
};

export default connect(mSTP, mDTP)(ProjectsIndex);
