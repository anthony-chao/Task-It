import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions/modalActions";
import LoginFormContainer from "../session/loginFormContainer";
import SignupFormContainer from "../session/signupFormContainer";
import CreateProjectFormContainer from "../project/createProjectFormContainer";
import UpdateProjectFormContainer from "../project/updateProjectFormContainer";
import DeleteProjectContainer from "../project/deleteProject";
import DeleteTaskContainer from "../task/deleteTaskContainer";
import UpdateTaskContainer from "../task/updateTaskContainer";
import CreateTaskForm from "../task/createTaskForm";

function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal.type) {
    case "login":
      component = <LoginFormContainer />;
      break;
    case "signup":
      component = <SignupFormContainer />;
      break;
    case "createProject":
      component = <CreateProjectFormContainer />;
      break;
    case "updateProject":
      component = <UpdateProjectFormContainer project={modal.project} />;
      break;
    case "deleteProject":
      component = <DeleteProjectContainer projectId={modal.projectId} />;
      break;
    case "deleteTask":
      component = <DeleteTaskContainer taskId={modal.task._id} />;
      break;
    case "updateTask":
      component = <UpdateTaskContainer task={modal.task} />;
      break;
    case "createTask":
      component = <CreateTaskForm projectId={modal.projectId} />;
      break;
    default:
      component = <LoginFormContainer />;
      return component;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={(e) => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
