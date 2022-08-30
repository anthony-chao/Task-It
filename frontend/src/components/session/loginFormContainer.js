import { connect } from "react-redux";
import { login } from "../../actions/sessionActions";
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
    login: (user) => dispatch(login(user)),
    closeModal: () => dispatch(closeModal()),
    otherForm: (
      <p>
        Don't have an account yet? &nbsp;&nbsp;
        <a onClick={() => dispatch(openModal("signup"))}>Sign Up</a>
      </p>
    ),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
