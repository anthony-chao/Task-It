import React, { useState, useEffect } from "react";

const ProjectForm = (props) => {
  const {
    currentUser,
    formType,
    errors,
    createProject,
    updateProject,
    project,
    closeModal,
  } = props;

  const [projectInfo, setProjectInfo] = useState({
    _id: "",
    name: "",
    description: "",
    ownerId: "",
    tasks: [],
    members: [],
  });

  useEffect(() => {
    if (project !== undefined) {
      setProjectInfo({
        _id: project._id,
        name: project.name,
        description: project.description,
        ownerId: project.ownerId,
        tasks: project.tasks,
        members: project.members,
      });
    }
  }, []);

  const handleUpdate = (field) => {
    return (e) =>
      setProjectInfo({
        ...projectInfo,
        [field]: e.currentTarget.value,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formType === "Create a Project"
      ? createProject(projectInfo)
      : updateProject(projectInfo);
    closeModal();
  };

  return (
    <div className="project-form-container">
      <h1>{console.log("###", `${formType}`)}</h1>
      <form className="create-project-header" onSubmit={handleSubmit}>
        <label className="create-project-label">
          Name:
          <input
            className="create-project-input"
            type="text"
            value={projectInfo.name}
            placeholder="Name"
            onChange={handleUpdate("name")}
          />
        </label>
        <br />
        <label className="create-project-label">
          Description:
          <input
            className="create-project-input"
            type="text"
            value={projectInfo.description}
            placeholder="Description"
            onChange={handleUpdate("description")}
          />
        </label>
        <br />
        <input
          type="submit"
          value={
            formType === "Create a Project"
              ? "Create Project"
              : "Update Project"
          }
        />
      </form>
    </div>
  );
};

export default ProjectForm;
