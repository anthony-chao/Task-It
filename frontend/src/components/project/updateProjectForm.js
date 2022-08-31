import { connect } from 'react-redux';
import { updateProject } from '../../actions/projects';
import ProjectForm from './ProjectForm';

const mapStateToProps = ({ session: { currentUser } }) => ({
  projectProp: {
    name: "",
    ownerId: currentUser,
    members: [],
    description: "",
    tasks: []
  },
  formType: 'Add project'
});

const mapDispatchToProps = dispatch => ({
  processForm: project => dispatch(addProject(project))
});


export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);