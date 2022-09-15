import React, { useEffect } from 'react';
import TaskItem from './taskItem';
import { fetchProjectTasks, fetchUserTasks } from '../../actions/taskActions';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modalActions';
import Chart from '../dashboard/Chart';
import { useHistory } from 'react-router-dom';
import { fetchUsers } from '../../actions/userActions';

const TaskList = (props) => {

    const {
        tasks,
        projectUrl,
        currentUser,
        users,
        fetchProjectTasks,
        openModal,
        fetchUserTasks,
        fetchUsers
      } = props;

    useEffect(() => {
        (projectUrl) ? fetchProjectTasks(projectUrl) : fetchUserTasks(currentUser.id);
    }, [props.location.pathname]);


    useEffect(() => {
        fetchUsers();
    }, [])

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
        <div>
            {(tasks).length === 0 && projectUrl ? 
                <div>
                    <h1>There are no tasks in this project!</h1>
                    <button onClick={handleCreate}>Add Task</button>
                </div>
             : null}

            {(tasks).length === 0 && !projectUrl ? 
                <div>
                    <h1>Hi {currentUser.firstName}! You currently have no assigned tasks!</h1> 
                    <p>Click here to assign yourself some tasks: <button onClick={() => history.push('/assigntask')}>Assign Tasks</button></p>
                </div>
            : null}

            {(tasks).length !== 0 && projectUrl ? 
                <div>
                    {/* <h1> {props.project.name} </h1>
                    <h3> {props.project.description} </h3> */}
                    <button onClick={handleCreate}>Add Task</button>
                </div>
            : null}

            {Object.values(tasks).length !== 0 && !projectUrl ? 
                <div>
                    <h1>Hi {currentUser.firstName}! Listed are all your assigned tasks:</h1> 
                </div>
            : null}

            {(tasks).length !== 0 ? 
                <div>
                    {(tasks).map(task => (
                        <TaskItem
                            task={task}
                            key={task._id}
                            users={users}
                        />
                    ))}
                    <div className="rechart-container">
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
        users: state.entities.users
    }
}

const mapDispatchToProps = dispatch => ({
    fetchProjectTasks: (projectId) => dispatch(fetchProjectTasks(projectId)),
    openModal: (type) => dispatch(openModal(type)),
    fetchUserTasks: (userId) => dispatch(fetchUserTasks(userId)),
    fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);