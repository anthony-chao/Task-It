import React from "react";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/projectActions";
import { closeModal } from "../../actions/modalActions";
import { CgSmileSad } from "react-icons/cg";

const DeleteProject = ({ projectId, deleteProject, closeModal }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    deleteProject(projectId);
    closeModal();
  };

  return (
    <div className="project-form-container">
      <h1>Delete Project</h1>
      <div className="form-content">
        <p>
          Are you sure you want to delete this project? This action cannot be
          undone. <CgSmileSad size={20} />
        </p>
        <div className="button-container">
          <button id="delete-button" onClick={handleDelete}>
            Delete
          </button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteProject: (projectId) => dispatch(deleteProject(projectId)),
  closeModal: () => dispatch(closeModal()),
});

export default connect(null, mapDispatchToProps)(DeleteProject);
