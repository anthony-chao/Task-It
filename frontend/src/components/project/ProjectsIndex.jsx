
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProjects } from "../../actions/projectActions";
import ProjectsIndexItem from "./ProjectsIndexItem";
import { FiFolderPlus } from 'react-icons/fi';
import { openModal } from "../../actions/modalActions";

const ProjectsIndex = ({ projects, fetchProjects, openModal }) => {
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <main className="projects-index-container">
      <div className="create-button">
        <p onClick={() => openModal('createProject')}>Create a Project</p>
        <p onClick={() => openModal('createProject')}><FiFolderPlus size={25} style={{ color: 'black' }}/></p>
      </div>

      <div className="projects-index-grid">
        {projects.map((project, index) => (
          <ProjectsIndexItem key={index} project={project} />
        ))}
      </div>
    </main>
  );
}

const mSTP = state => {
  return {
    projects: Object.values(state.entities.projects),
  }
}

const mDTP = dispatch => {
  return {
    fetchProjects: () => dispatch(fetchProjects()),
    openModal: formType => dispatch(openModal(formType))
  }
}

export default connect(mSTP, mDTP)(ProjectsIndex);