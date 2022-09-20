import { connect } from "react-redux";
import {
  createProject,
  clearReceiveErrors,
} from "../../actions/projectActions";
import ProjectForm from "./ProjectForm";
import { closeModal } from "../../actions/modalActions";

const mapStateToProps = (state) => ({
  currentUser: state.session.user.id,
  formType: "Create a Project",
  errors: state.errors.project,
});

const mapDispatchToProps = (dispatch) => ({
  createProject: (project) => dispatch(createProject(project)),
  clearErrors: () => dispatch(clearReceiveErrors()),
  closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
