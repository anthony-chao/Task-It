import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import ProjectForm from "./ProjectForm";
import { closeModal } from "../../actions/modalActions";

const mapStateToProps = (state) => ({
  currentUser: state.session.user.id,
  formType: "Create a Project",
  errors: state.errors.session,
});

const mapDispatchToProps = (dispatch) => ({
  createProject: (project) => dispatch(createProject(project)),
  closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
