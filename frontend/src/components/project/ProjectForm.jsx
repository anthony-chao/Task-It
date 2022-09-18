import React, { useState, useEffect } from "react";

const ProjectForm = (props) => {
  const {
    formType,
    errors,
    createProject,
    updateProject,
    project,
    clearErrors,
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

  const [error, setError] = useState({
    empty: false,
    length: false,
  });

  const handleError = () => {
    if (projectInfo.description.length === 0) {
      setError(true);
      return true;
    }
    setError(false);
    return false;
  };

  useEffect(() => {
    if (project) {
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

  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, []);

  const handleUpdate = (field) => {
    return (e) =>
      setProjectInfo({
        ...projectInfo,
        [field]: e.currentTarget.value,
      });
  };

  // const renderErrors = () => {
  // let errorMsg = Object.values(errors);
  // console.log(errors);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // let projectError = handleError();
    // if (!projectError)

    const projectData = Object.assign({}, projectInfo);
    if (formType === "Create a Project") {
      createProject(projectData).then((response) => {
        if (response !== undefined) {
          closeModal();
        }
      });
    } else {
      updateProject(projectData).then((response) => {
        if (response !== undefined) {
          closeModal();
        }
      });
    }
  };

  return (
    <div className="project-form-container">
      <h1>{formType}</h1>
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
          {/* {errors.name ? renderErrors() : null} */}
          {errors.name ? <p className="proj-error">{errors.name}</p> : null}
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
          {/* {errors.description ? renderErrors() : null} */}
          {errors.description ? (
            <p className="proj-error">{errors.description}</p>
          ) : null}
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
