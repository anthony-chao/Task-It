import { connect } from 'react-redux';
import { createProject } from '../../actions/projects';
import ProjectForm from './ProjectForm';
import { closeModal } from '../../actions/modalActions';

const mapStateToProps = state => ({
  currentUser: state.session.user.id,
  formType: 'Create project'
});

const mapDispatchToProps = dispatch => ({
  processForm: project => dispatch(createProject(project)),
  closeModal: () => dispatch(closeModal())
});


export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);