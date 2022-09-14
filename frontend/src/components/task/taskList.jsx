import React, { useEffect } from 'react';
import TaskItem from './taskItem';
import { fetchTasks, fetchUserTasks } from '../../actions/taskActions';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modalActions';
import Chart from '../dashboard/Chart';

const TaskList = (props) => {

    useEffect(() => {
        (props.projectUrl) ? props.fetchTasks(props.projectUrl) : props.fetchUserTasks(props.currentUserId);
    }, []);

    const handleCreate = () => {
        props.openModal({
            type: 'createTask',
            projectId: props.projectUrl
        })
    }

    const countCompleted = (Object.values(props.tasks).reduce((count, task) => task.status === "Completed" ? count + 1 : count, 0))
    const countIncomplete = (Object.values(props.tasks).reduce((count, task) => task.status !== "Completed" ? count + 1 : count, 0))

    return (
        <div>
            <h1> {props.project.name} </h1>
            <h3> {props.project.description} </h3>
            {props.projectUrl ? 
            <button onClick={handleCreate}>Add Task</button>
            : null
            }
            {Object.values(props.tasks).length === 0 && props.projectUrl ? <h1>There are no tasks in this project!</h1> : null}
            {Object.values(props.tasks).length === 0 && !props.projectUrl ? <h1>You currently have no assigned tasks!</h1> : null}
            {/* < CreateTaskForm projectId={props.projectUrl}/> */}
            {Object.values(props.tasks).map(task => (
                <TaskItem
                    task={task}
                    key={task.id}
                />
            ))}
            <div className="rechart-container">
            < Chart data={[{name: "Completed", value: countCompleted}, {name: "Incomplete", value: countIncomplete, fill:"#FF0000"}]}/>
            </div>
            {/* <h1>Completed Tasks: {(Object.values(props.tasks).reduce((count, task) => task.status === "Completed" ? count + 1 : count, 0))}</h1>  */}

        </div>
    )

}

const mapStateToProps = (state, ownProps) => {
    return {
        tasks: (state.entities.tasks.tasks) ? Object.values(state.entities.tasks.tasks) : Object.values(state.entities.tasks),
        project: (state.entities.tasks.projects) ? state.entities.tasks.projects : "",
        projectUrl: (ownProps.match.params.projectId) ? ownProps.match.params.projectId : null,
        currentUserId: state.session.user.id
    }
}

const mapDispatchToProps = dispatch => ({
    fetchTasks: (projectId) => dispatch(fetchTasks(projectId)),
    openModal: (type) => dispatch(openModal(type)),
    fetchUserTasks: (userId) => dispatch(fetchUserTasks(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);