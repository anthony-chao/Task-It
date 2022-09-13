import React, { useEffect } from 'react';
import TaskItem from './taskItem';
import { fetchTasks } from '../../actions/taskActions';
import { connect } from 'react-redux';
import CreateTaskForm from './createTaskForm';

const TaskList = (props) => {

    useEffect(() => {
        props.fetchTasks(props.projectUrl);
    }, []);

    return (
        <div>
            < CreateTaskForm projectId={props.projectUrl}/>
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
        tasks: (Object.keys(state.entities.tasks).length !== 0) ? Object.values(state.entities.tasks) : [],
        projectUrl: ownProps.match.params.projectId
    }
}

const mapDispatchToProps = dispatch => ({
    fetchTasks: (projectId) => dispatch(fetchTasks(projectId))
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);