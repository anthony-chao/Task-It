import { connect } from "react-redux";
import {
  updateProject,
  clearReceiveErrors,
} from "../../actions/projectActions";
import ProjectForm from "./ProjectForm";
import { closeModal } from "../../actions/modalActions";

const mapStateToProps = (state) => ({
  formType: "Update Project",
  errors: state.errors.project,
});

const mapDispatchToProps = (dispatch) => ({
  updateProject: (project) => dispatch(updateProject(project)),
  clearErrors: () => dispatch(clearReceiveErrors()),
  closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
