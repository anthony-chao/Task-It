import React from 'react';
import { connect } from 'react-redux';
import { deleteTask } from '../../actions/taskActions';
import { closeModal } from '../../actions/modalActions';

const DeleteTaskContainer = (props) => {

    const handleDelete = () => {
        props.deleteTask(props.taskId)
    }

    return (
        <div>
            <div>Are you sure you want to delete this task?</div>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={props.closeModal}>Cancel</button>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    deleteTask: (taskId) => dispatch(deleteTask(taskId)),
    closeModal: () => dispatch(closeModal())
})

export default connect(null, mapDispatchToProps)(DeleteTaskContainer);