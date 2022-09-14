import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateTask, deleteTask } from '../../actions/taskActions';
import { openModal, closeModal } from '../../actions/modalActions';

const TaskItem = (props) => {

    const [state, setState] = useState({
        _id: props.task._id,
        projectId: props.task.projectId,
        description: props.task.description,
        assignedUser: props.task.assignedUser,
        status: props.task.status,
        editing: false
    })

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loading) {
            props.updateTask(state.projectId, state);
        }
    }, [loading]);

    const handleToggle = () => {
        if (state.status === "Incomplete") {
            setState({...state, status: "Completed"});
            setLoading(true)
        }
        else {
            setState({...state, status: "Incomplete"});
            setLoading(true)
        }
    }

    const handleDelete = () => {
        props.openModal({
            type: 'deleteTask',
            task: state
        })
    }

    const handleUpdate = () => {
        props.openModal({
            type: 'updateTask',
            task: state
        })
    }

    return (
        <li>
            <div>
            <input type="checkbox" 
                checked={(state.status === "Incomplete") ? false : true}
                onChange= {handleToggle}
                id="checkbox"
            />
            <label for="checkbox" data-content={props.task.description}>
                {props.task.description}
            </label>
                {props.task.assignedUser}
            </div>
            <button onClick={handleUpdate}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </li>
    )
}

const mapDispatchToProps = dispatch => ({
    deleteTask: (taskId) => dispatch(deleteTask(taskId)),
    updateTask: (projectId, task) => dispatch(updateTask(projectId, task)),
    openModal: (type) => dispatch(openModal(type))
})

export default connect(null, mapDispatchToProps)(TaskItem);