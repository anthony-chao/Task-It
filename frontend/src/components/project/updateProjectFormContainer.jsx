import { connect } from "react-redux";
import { updateProject } from "../../actions/projectActions";
import ProjectForm from "./ProjectForm";
import { closeModal } from "../../actions/modalActions";

const mapStateToProps = (state) => ({
  currentUser: state.session.user.id,
  formType: "Update Project",
  errors: state.errors.session,
});

const mapDispatchToProps = (dispatch) => ({
  updateProject: (projectId) => dispatch(updateProject(projectId)),
  closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
