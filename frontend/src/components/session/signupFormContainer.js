import { connect } from "react-redux";
import {
  signup,
  login,
  clearReceiveErrors,
} from "../../actions/sessionActions";
import { openModal, closeModal } from "../../actions/modalActions";
import SessionForm from "./SessionForm";

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    formType: "Sign Up",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: (user) => dispatch(signup(user)),
    login: (user) => dispatch(login(user)),
    clearReceiveErrors: () => dispatch(clearReceiveErrors()),
    closeModal: () => dispatch(closeModal()),
    otherForm: (
      <p>
        Already have an account? &nbsp;&nbsp;
        <a onClick={() => dispatch(openModal("login"))}>Log In</a>
      </p>
    ),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
