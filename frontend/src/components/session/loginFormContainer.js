import { connect } from "react-redux";
import { login, clearReceiveErrors } from "../../actions/sessionActions";
import { openModal, closeModal } from "../../actions/modalActions";
import SessionForm from "./SessionForm";

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    formType: "Log In",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: (user) => dispatch(login(user)),
    clearReceiveErrors: () => dispatch(clearReceiveErrors()),
    closeModal: () => dispatch(closeModal()),
    otherForm: (
      <p>
        Don't have an account yet? &nbsp;&nbsp;
        <a onClick={() => dispatch(openModal({type: "signup"}))}>Sign Up</a>
      </p>
    ),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
