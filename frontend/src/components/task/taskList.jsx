import React, { useEffect } from 'react';
import TaskItem from './taskItem';
import { fetchProjectTasks, fetchUserTasks } from '../../actions/taskActions';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modalActions';
import Chart from '../dashboard/Chart';
import { useHistory } from 'react-router-dom';
import { fetchUsers } from '../../actions/userActions';
import { BiUndo } from "react-icons/bi";
import { MdNoteAdd } from 'react-icons/md';
import { fetchProject } from '../../actions/projectActions';

const TaskList = (props) => {

    const {
        tasks,
        projectUrl,
        currentUser,
        users,
        fetchProjectTasks,
        openModal,
        fetchUserTasks,
        fetchUsers,
        fetchProject,
        projects
      } = props;
      
      useEffect(() => {
          (projectUrl) ? fetchProjectTasks(projectUrl) : fetchUserTasks(currentUser.id);
        }, [props.location.pathname]);

        useEffect(() => {
            if (projectUrl) {
                fetchProject(projectUrl)
            }
          }, [props.location.pathname]);
        
        useEffect(() => {
            fetchUsers();
        }, [props.location.pathname]);

    const handleCreate = () => {
        openModal({
            type: 'createTask',
            projectId: projectUrl
        })
    }

    const countCompleted = ((tasks).reduce((count, task) => task.status === "Completed" ? count + 1 : count, 0))
    const countIncomplete = ((tasks).reduce((count, task) => task.status !== "Completed" ? count + 1 : count, 0))
    const history = useHistory();

    return (
        <div className="projects-index-container">

            {projectUrl ? 
                <div className="task-showpage-top-buttons">
                    <div className="task-showpage-project-name">
                    {(Object.values(projects).length !== 0 && projectUrl) ? 
                        <div className="project-info">
                            <ul>
                            <li>
                                <p className="project-text">Project Name:</p>
                                <p className="project-input">
                                {projects[projectUrl].name}
                                </p>
                            </li>
                            <li>
                                <p className="project-text">Description:</p>
                                <p className="project-input">
                                {projects[projectUrl].description}
                                </p>
                            </li>
                            </ul>
                        </div>
                        : null }
                    </div>
                    <p id="redirect-project-index"><BiUndo onClick={() => history.push('/projects')} icon="fa-solid fa-rotate-left" /></p>
                    <div className="create-button"><p onClick={handleCreate}>Add Task</p><MdNoteAdd id="add-task-icon" onClick={handleCreate}/></div>
                </div>
            : null}

            {tasks.length === 0 && projectUrl ? 
                <div className="no-tasks-showpage">
                    <h1>There are no tasks in this project!</h1>
                    {/* <p onClick={handleCreate}>Add Task</p> */}
                </div>
             : null}

            {tasks.length === 0 && !projectUrl ? 
                <div className="no-tasks-showpage">
                    <h1>Hi {currentUser.firstName}! </h1> 
                    <h2>You currently have no assigned tasks!</h2>
                    <h3>Click here to assign yourself some tasks: <p onClick={() => history.push('/assigntask')}>Assign Tasks</p></h3>
                </div>
            : null}

            {tasks.length !== 0 && !projectUrl ? 
                <div className="no-tasks-showpage">
                    <h1>Hi {currentUser.firstName}!</h1> 
                    <h2>Listed are all your assigned tasks:</h2>
                </div>
            : null}

            {(tasks.length !== 0 && Object.values(users).length !== 0)? 
                <div className="task-show-page">
                    <ul className="tasks-index-grid">
                        {(tasks).map((task, index) => (
                            <TaskItem
                                task={task}
                                key={task._id}
                                users={users}
                                index={index}
                            />
                        ))}
                    </ul>
                    <div className="rechart-container">
                        <div className="pin">
                            <div className="shadow"></div>
                            <div className="metal"></div>
                            <div className="bottom-circle"></div>
                        </div>
                        < Chart data={[{name: "Completed", value: countCompleted}, {name: "Incomplete", value: countIncomplete, fill:"#FF0000"}]}/>
                    </div>
                </div>
            : null}
        </div>
    )

}

const mapStateToProps = (state, ownProps) => {
    return {
        tasks: Object.values(state.entities.tasks),
        projectUrl: (ownProps.match.params.projectId) ? ownProps.match.params.projectId : null,
        currentUser: state.session.user,
        users: state.entities.users,
        projects: state.entities.projects
    }
}

const mapDispatchToProps = dispatch => ({
    fetchProjectTasks: (projectId) => dispatch(fetchProjectTasks(projectId)),
    openModal: (type) => dispatch(openModal(type)),
    fetchUserTasks: (userId) => dispatch(fetchUserTasks(userId)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchProject: (projectId) => dispatch(fetchProject(projectId))
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);