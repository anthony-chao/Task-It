import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateTask } from "../../actions/taskActions";
import { closeModal } from "../../actions/modalActions";
import { clearReceiveErrors } from "../../actions/taskActions";

const UpdateTaskForm = (props) => {
  const [state, setState] = useState({
    _id: props.task._id,
    description: props.task.description,
    status: props.task.status,
    projectId: props.task.projectId,
    assignedUser: props.task.assignedUser,
  });

  useEffect(() => {
    return () => {
      props.clearReceiveErrors();
    };
  }, []);

  const handleUpdate = (field) => {
    return (e) => setState({ ...state, [field]: e.currentTarget.value });
  };

  const [error, setError] = useState(false);

  const handleError = () => {
    if (state.description.length === 0) {
      setError(true);
      return true;
    } else {
      setError(false);
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskError = handleError();

    if (!taskError) {
      props.updateTask(state);
      props.closeModal();
    }
  };

  return (
    <div className="task-form-container">
      <h1>Update Task</h1>
      <form className="form-content" onSubmit={handleSubmit}>
        <label className="form-label">
          Task:
          <input
            type="text"
            placeholder="Describe your task"
            value={state.description}
            onChange={handleUpdate("description")}
          />
          {error ? (
            <p className="session-error">Task field cannot be empty!</p>
          ) : null}
        </label>

        <div className="button-container">
          <button type="submit">Submit</button>
          <button onClick={props.closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    // projectId: ownProps.match.params.projectId
    errors: state.errors.task,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateTask: (task) => dispatch(updateTask(task)),
  closeModal: () => dispatch(closeModal()),
  clearReceiveErrors: () => dispatch(clearReceiveErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTaskForm);
