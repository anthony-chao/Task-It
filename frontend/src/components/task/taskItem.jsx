import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateTask, deleteTask } from '../../actions/taskActions';

const TaskItem = (props) => {

    const [state, setState] = useState({
        _id: props.task._id,
        projectId: props.task.projectId,
        description: props.task.description,
        assignedUser: props.task.assignedUser,
        status: props.task.status,
        editing: false
    })

    const handleUpdate = (field) => {
        return (e) => {
            setState({...state, [field]: e.currentTarget.value})
        }
    }

    const updateStatus = () => {
        props.updateStatus(state._id)       // we need an action for this
    }

    const handleDelete = () => {
        props.deleteTask(state._id)
    }

    const handleOpenEdit = () => {
        setState({...state, editing: true})
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.updateTask(state.projectId, state);
        setState({...state, editing: false})
    }

    return (
        <li>
            { (state.editing === true) ?
                <form onSubmit={handleSubmit}>
                    <input type="text"
                           value={state.description}
                           placeholder="Description cannot be blank!"
                           onChange={handleUpdate('description')}
                    />
                    <button type="submit">Update</button>
                </form>
                : <div>{props.task.description}</div>
            }
            <input type="checkbox" 
                checked={(state.status === "Incomplete") ? false : true}
                onChange= {() => updateStatus()}
            />
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleOpenEdit}>Edit</button>
        </li>
    )
}

const mapDispatchToProps = dispatch => ({
    deleteTask: (taskId) => dispatch(deleteTask(taskId)),
    updateTask: (projectId, task) => dispatch(updateTask(projectId, task))
})

export default connect(null, mapDispatchToProps)(TaskItem);