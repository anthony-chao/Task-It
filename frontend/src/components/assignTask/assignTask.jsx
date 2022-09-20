import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllTasks } from "../../actions/taskActions";
import { fetchUsers } from "../../actions/userActions";
import Autocomplete from "@mui/lab/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { updateAssignedTask } from "../../actions/taskActions";
import Alert from "@mui/material/Alert";

const AssignTask = (props) => {
  const [input, setInput] = useState({
    email: "",
    task: "",
  });

  const [error, setError] = useState({
    error: false,
    success: false,
    open: true,
  });

  useEffect(() => {
    props.fetchUsers();
    props.fetchAllTasks();
  }, []);

  const handleError = () => {
    if (!input.email || !input.task) {
      setError({ error: true });
      return true;
    } else {
      setError({ error: false });
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!handleError()) {
      let selectedUser = props.allUsers
        .map((object) => [object._id, object.email])
        .filter((arr) => arr[1] === input.email.split("(")[1].slice(0, -1));
      let userId = selectedUser[0][0];
      let selectedTask = props.allTasks
        .map((object) => [object._id, object.description])
        .filter((arr) => arr[1] === input.task);
      let taskId = selectedTask[0][0];
      props.updateAssignedTask(taskId, userId);
      setError({ error: false });
      setError({ success: true });
    } else {
      setError({ error: true });
    }
  };

  const handleUpdate = (field) => {
    return (e) => {
      setInput({ ...input, [field]: e.currentTarget.textContent });
    };
  };

  return (
    <div className="main-container">
      <div className="assign-task-form">
        <h1 id="assign-task-header">
          Use the following form to assign a task to a user:
        </h1>
        {props.allTasks && props.allUsers ? (
          <div className="assign-task-inner-div">
            {error.error ? (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert
                  id="assign-task-alert"
                  severity="error"
                  onClose={() => {
                    setError({ open: false });
                  }}
                >
                  You must enter a valid user and task!
                </Alert>
              </Stack>
            ) : null}
            {error.success ? (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert
                  id="assign-task-alert"
                  severity="success"
                  onClose={() => {
                    setError({ open: false });
                  }}
                >
                  You have successfully assigned {input.email.split(" ")[0]} a
                  task!
                </Alert>
              </Stack>
            ) : null}
            <form onSubmit={handleSubmit}>
              <Stack spacing={2} sx={{ width: 300 }}>
                <div className="paper pink">
                  <div className="tape-section"></div>
                  <Autocomplete
                    id="free-solo-demo"
                    className="autocomplete-task"
                    freeSolo
                    options={props.allUsers.map((option) =>
                      option.firstName.concat(
                        " ",
                        option.lastName,
                        " (",
                        option.email,
                        ")"
                      )
                    )}
                    onChange={handleUpdate("email")}
                    renderInput={(params) => (
                      <TextField {...params} label="Enter a user's email" />
                    )}
                  />
                  <div className="tape-section"></div>
                </div>
                <br />
                <div className="paper blue">
                  <div className="top-tape"></div>
                  <Autocomplete
                    id="free-solo-demo-2"
                    className="autocomplete-task"
                    freeSolo
                    options={props.allTasks.map((option) => option.description)}
                    onChange={handleUpdate("task")}
                    renderInput={(params) => (
                      <TextField {...params} label="Enter a task name" />
                    )}
                  />
                </div>
              </Stack>
              <input
                type="submit"
                value="Assign Task"
                id="assign-task-button"
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allUsers: state.entities.users ? Object.values(state.entities.users) : null,
    // allTasks: Object.values(state.entities.tasks)
    allTasks: Object.values(state.entities.tasks).filter(
      (task) => task.status === "Incomplete"
    ),
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchAllTasks: () => dispatch(fetchAllTasks()),
  updateAssignedTask: (taskId, userId) =>
    dispatch(updateAssignedTask(taskId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignTask);
