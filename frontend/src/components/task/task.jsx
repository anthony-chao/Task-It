import React, { useState, useEffect } from 'react';
import CreateTaskForm from './createTaskForm';
import TaskList from './taskList';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import LoadingContainer from '../util/LoadingContainer';
import { updateProject, deleteProject } from '../../actions/projectActions';
import { createTask } from '../../actions/taskActions'

const Task = (props) => {

  // console.log(props)
  // const [project, setProject] = useState(project)

  let history = useHistory();

  const handleDelete = () => {
    props.deleteProject(props.project._id).then(() => history.push('/dashboard'))
  }

  const taskContent = () => {
    return (
      <>
        <div className='project-info-container'>
          <div className='project-name'>
            <span>Project Name:</span> 
              <h1>{props.project.name}</h1>
          </div>
          <div className="project-description">
            <span>Project Description:</span>
              <h1>{props.project.description}</h1>
          </div>

          <div className="project-buttons">
            <button className="project-delete-button" onClick={handleDelete}>
              Delete Project
            </button>

            <button className="project-update-button">
              Update Project
            </button>
            
          </div>
        </div>

        <div className="task-info-container">
          <div className="task-info">
            <span>Task List:</span>
          </div>

          <CreateTaskForm createTask={props.createTask}/>
          <TaskList tasks={props.tasks} deleteTask={props.deleteTask} updateTask={props.updateTask}/>
        </div>
      </>
    )
  }

  return props.project ? taskContent() : null //<LoadingContainer />;

}

const mapStateToProps = (state, ownProps) => ({
    // WE NEED STATE TO HAVE A PROJECT WITH AN ARRAY OF TASKS SO WE CAN MAP OVER THEM
    userProjects: Object.values(state.entities.projects),
    currentUserId: state.session.user.id,
    project: state.entities.projects[ownProps.location.pathname.split("/")[3]]
})

const mapDispatchToProps = dispatch => ({
    createTask: (task) => dispatch(createTask(task)),
    // deleteTask: (taskId) => dispatch(deleteTask(taskId)),
    // updateTask: (taskId) => dispatch(updateTask(taskId))
    updateProject: (projectId) => dispatch(updateProject(projectId)),
    deleteProject: (projectId) => dispatch(deleteProject(projectId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Task));