
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProjects } from "../../actions/projectActions";
import ProjectsIndexItem from "./ProjectsIndexItem";

const ProjectsIndex = ({ projects, fetchProjects }) => {
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <main className="projects-index-container">
        {projects.map((project, index) => (
          <ProjectsIndexItem key={index} project={project} />
        ))}
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
    fetchProjects: () => dispatch(fetchProjects())
  }
}

export default connect(mSTP, mDTP)(ProjectsIndex);