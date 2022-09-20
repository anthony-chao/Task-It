import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateTask } from "../../actions/taskActions";
import { openModal } from "../../actions/modalActions";
import { BiEditAlt, BiTrashAlt } from "react-icons/bi";
import LoadingContainer from "../util/LoadingContainer";

const TaskItem = (props) => {
  const { task, users, updateTask, openModal } = props;

  const [state, setState] = useState(task);

  useEffect(() => {
    setState(task);
  }, [task]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      updateTask(state);
      setLoading(false);
    }
  }, [loading]);

  const handleToggle = () => {
    if (state.status === "Incomplete") {
      setState({ ...state, status: "Completed" });
      setLoading(true);
    } else {
      setState({ ...state, status: "Incomplete" });
      setLoading(true);
    }
  };

  const handleDelete = () => {
    openModal({
      type: "deleteTask",
      task: task,
    });
  };

  const handleUpdate = () => {
    openModal({
      type: "updateTask",
      task: task,
    });
  };

  const allUsers = () => {
    let array = [];

    if (task.assignedUser.length !== 0 && Object.values(users).length > 1) {
      for (let i = 0; i < task.assignedUser.length; i++) {
        array.push(
          users[task.assignedUser[i]].firstName.concat(
            " ",
            users[task.assignedUser[i]].lastName
          )
        );
      }
      {
        return [...new Set(array)].map((user) => (
          <p className="task-assigned-user">{user}</p>
        ));
      }
    }
  };

  return (
    <>
      {Object.keys(task).length !== 0 && task ? (
        <li
          className="task-index-item"
          key={`${Math.floor(Math.random() * 20)}`}
        >
          <div className="task-item-no-buttons" id="task-item-no-buttons">
            <div className="task-item-name">
              <div className="task-item-counter">
                <input
                  type="checkbox"
                  checked={state.status === "Incomplete" ? false : true}
                  onChange={handleToggle}
                  id="checkbox"
                />
                <p>Task #{props.index + 1}</p>
              </div>
              <div id="task-description">{task.description}</div>
              <div className="task-assigned-users">
                <p className="task-text">Assigned Users:</p>
                {Object.values(users).length !== 0 && task.assignedUser[0] ? (
                  allUsers()
                ) : (
                  <p className="task-assigned-user">None</p>
                )}
              </div>
            </div>
            <div className="task-action-buttons">
              <BiEditAlt id="task-button-icons" onClick={handleUpdate} />
              <BiTrashAlt id="task-button-icons" onClick={handleDelete} />
            </div>
          </div>
        </li>
      ) : (
        <LoadingContainer />
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateTask: (task) => dispatch(updateTask(task)),
  openModal: (type) => dispatch(openModal(type)),
});

export default connect(null, mapDispatchToProps)(TaskItem);
