import React from "react";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/projectActions";
import { closeModal } from "../../actions/modalActions";

const DeleteProject = ({ projectId, deleteProject, closeModal }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    deleteProject(projectId);
    closeModal();
  };

  return (
    <div>
      <div>
        Are you sure you want to delete this project? This cannot be undone.
      </div>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteProject: (projectId) => dispatch(deleteProject(projectId)),
  closeModal: () => dispatch(closeModal()),
});

export default connect(null, mapDispatchToProps)(DeleteProject);
