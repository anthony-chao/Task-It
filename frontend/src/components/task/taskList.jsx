import React, { useEffect } from 'react';
import TaskItem from './taskItem';
import { fetchProjectTasks, fetchUserTasks } from '../../actions/taskActions';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modalActions';
import Chart from '../dashboard/Chart';
import { useHistory } from 'react-router-dom';
import { fetchUsers } from '../../actions/userActions';

const TaskList = (props) => {

    useEffect(() => {
        (props.projectUrl) ? props.fetchProjectTasks(props.projectUrl) : props.fetchUserTasks(props.currentUser.id);
    }, [props.location.pathname]);


    useEffect(() => {
        props.fetchUsers();
    }, [])

    const handleCreate = () => {
        props.openModal({
            type: 'createTask',
            projectId: props.projectUrl
        })
    }

    const countCompleted = (Object.values(props.tasks).reduce((count, task) => task.status === "Completed" ? count + 1 : count, 0))
    const countIncomplete = (Object.values(props.tasks).reduce((count, task) => task.status !== "Completed" ? count + 1 : count, 0))
    const history = useHistory();

    return (
        <div>
            {Object.values(props.tasks).length === 0 && props.projectUrl ? 
                <div>
                    <h1>There are no tasks in this project!</h1>
                    <button onClick={handleCreate}>Add Task</button>
                </div>
             : null}

            {Object.values(props.tasks).length === 0 && !props.projectUrl ? 
                <div>
                    <h1>Hi {props.currentUser.firstName}! You currently have no assigned tasks!</h1> 
                    <p>Click here to assign yourself some tasks: <button onClick={() => history.push('/assigntask')}>Assign Tasks</button></p>
                </div>
            : null}

            {Object.values(props.tasks).length !== 0 && props.projectUrl ? 
                <div>
                    <h1> {props.project.name} </h1>
                    <h3> {props.project.description} </h3>
                    <button onClick={handleCreate}>Add Task</button>
                </div>
            : null}

            {Object.values(props.tasks).length !== 0 && !props.projectUrl ? 
                <div>
                    <h1>Hi {props.currentUser.firstName}! Listed are all your assigned tasks:</h1> 
                </div>
            : null}

            {Object.values(props.tasks).length !== 0 ? 
                <div>
                    {Object.values(props.tasks).map(task => (
                        <TaskItem
                            task={task}
                            key={task.id}
                            users={props.users}
                        />
                    ))}
                    <div className="rechart-container">
                        < Chart data={[{name: "Completed", value: countCompleted}, {name: "Incomplete", value: countIncomplete, fill:"#FF0000"}]}/>
                    </div>
                </div>
            : null}
            
            {/* <h1> {props.project.name} </h1>
            <h3> {props.project.description} </h3>
            {props.projectUrl ? 
            <button onClick={handleCreate}>Add Task</button>
            : null
            }
            {Object.values(props.tasks).length === 0 && props.projectUrl ? <h1>There are no tasks in this project!</h1> : null}
            {Object.values(props.tasks).length === 0 && !props.projectUrl ? 
                <div>
                    <h1>You currently have no assigned tasks!</h1> 
                    <p>Click here to assign yourself some tasks: <button onClick={() => history.push('/assigntask')}>Assign Tasks</button></p>
                </div>
            : null}
            {Object.values(props.tasks).map(task => (
                <TaskItem
                    task={task}
                    key={task.id}
                />
            ))}
            <div className="rechart-container">
            < Chart data={[{name: "Completed", value: countCompleted}, {name: "Incomplete", value: countIncomplete, fill:"#FF0000"}]}/>
            </div> */}

        </div>
    )

}

const mapStateToProps = (state, ownProps) => {
    return {
        tasks: (state.entities.tasks.tasks) ? Object.values(state.entities.tasks.tasks) : Object.values(state.entities.tasks),
        project: (state.entities.tasks.projects) ? state.entities.tasks.projects : "",
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