import React, { useEffect } from 'react';
import TaskItem from './taskItem';
import { fetchTasks, fetchUserTasks } from '../../actions/taskActions';
import { connect } from 'react-redux';
import CreateTaskForm from './createTaskForm';
import { openModal } from '../../actions/modalActions';

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

    return (
        <div>
            <h1> {props.project.name} </h1>
            <h3> {props.project.description} </h3>
            {props.projectUrl ? 
            <button onClick={handleCreate}>Add Task</button>
            : null
            }
            {/* < CreateTaskForm projectId={props.projectUrl}/> */}
            {Object.values(props.tasks).map(task => (
                <TaskItem
                    task={task}
                    key={task.id}
                />
            ))}
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