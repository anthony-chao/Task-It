import { connect } from 'react-redux';
import { createProject } from '../../actions/projects';
import ProjectForm from './ProjectForm';
import { closeModal } from '../../actions/modalActions';

const mapStateToProps = state => ({
  currentUser: state.session.user.id,
  formType: 'Create a Project'
});

const mapDispatchToProps = dispatch => ({
  processForm: project => dispatch(createProject(project)),
  closeModal: () => dispatch(closeModal())
});


export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);