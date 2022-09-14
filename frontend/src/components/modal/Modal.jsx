import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modalActions';
import LoginFormContainer from '../session/loginFormContainer';
import SignupFormContainer from '../session/signupFormContainer';
import CreateProjectFormContainer from '../project/createProjectFormContainer';
import ProjectFormContainer from '../project/ProjectForm';

function Modal({modal, closeModal}) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'login':
      component = <LoginFormContainer />;
      break;
    case 'signup':
      component = <SignupFormContainer />;
      break;
    case 'createProject':
      component = <CreateProjectFormContainer/>;
      break;
    case 'updateProject':
      component = <ProjectFormContainer/>;
      break;
    default:
      component = <LoginFormContainer />;
      return component;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);