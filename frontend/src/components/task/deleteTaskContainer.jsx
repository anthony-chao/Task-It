import React from "react";
import { connect } from "react-redux";
import { deleteTask } from "../../actions/taskActions";
import { closeModal } from "../../actions/modalActions";
import { CgSmileSad } from "react-icons/cg";

const DeleteTaskContainer = ({ taskId, deleteTask, closeModal }) => {
  const handleDelete = () => {
    deleteTask(taskId);
    closeModal();
  };

  return (
    <div className="task-form-container">
      <h1>Delete Task</h1>
      <div className="form-content">
        <p>
          Are you sure you want to delete this task? This action cannot be
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
  deleteTask: (taskId) => dispatch(deleteTask(taskId)),
  closeModal: () => dispatch(closeModal()),
});

export default connect(null, mapDispatchToProps)(DeleteTaskContainer);
