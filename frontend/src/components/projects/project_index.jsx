import React from 'react';
import { connect } from 'react-redux';
import { fetchUserProjects } from '../../actions/project_actions';
import ProjectIndexItem from './project_index_item';

class ProjectIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: []
        }
    }
    
    componentWillMount() {
        this.props.fetchUserProjects(this.props.currentUser.id)
    }

    componentWillReceiveProps(newState) {
      this.setState({ projects: newState.projects });
    }
    
    render() {
        if (this.state.projects.length === 0) {
          return (<div>This user has no projects</div>)
        } else {
          return (
            <div>
              <h2>All of This User's Projects</h2>
              {this.state.projects[0].map(project => (
                <ProjectIndexItem key={project._id} name={project.name} members={project.members} description={project.description}/>
              ))}
            </div>
          );
        }
      }
}

const mapStateToProps = (state) => ({
    projects: Object.values(state.project.user),     // not really sure what goes after state.project?
    currentUser: state.session.user
})

const mapDispatchToProps = (dispatch) => ({
    fetchUserProjects: userId => dispatch(fetchUserProjects(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectIndex)