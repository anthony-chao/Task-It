import { connect } from 'react-redux';
import { updateProject, deleteProject } from '../../actions/projects';
import ProjectForm from './ProjectForm';
import { closeModal } from '../../actions/modalActions';

const mapStateToProps = state => ({
    currentUser: state.session.user.id,
    formType: 'Update Project'
});

const mapDispatchToProps = dispatch => ({
  processForm: project => dispatch(updateProject(project)),
  closeModal: () => dispatch(closeModal()),
  deleteProject: (projectId) => dispatch(deleteProject(projectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);