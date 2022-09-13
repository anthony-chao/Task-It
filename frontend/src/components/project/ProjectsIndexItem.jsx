import React, { useEffect } from "react";

const ProjectsIndexItem = ({ project }) => {
  const { name, description } = project

  return (
    <div className="project-index-item">
      <ul className="project-info">
        <li className="project-name">Project Name: {name}</li>
        <li className="project-desc">Description: {description}</li>
      </ul>
    </div>
  );
}

export default ProjectsIndexItem;