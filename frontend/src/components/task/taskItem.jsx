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
            props.updateTask(state);
            setLoading(false);
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

    const allUsers = () => {
        let array = [];
        for (let i = 0; i < props.task.assignedUser.length; i++) {
            array.push(props.users[props.task.assignedUser[i]].firstName.concat(" ", props.users[props.task.assignedUser[i]].lastName))
        }
        {return ([... new Set(array)].map(user => (
            <p>{user}</p>
        )))}
    }
    
    return (
        <li>
            {console.log(state)}
            <div>
            <input type="checkbox" 
                checked={(state.status === "Incomplete") ? false : true}
                onChange= {handleToggle}
                id="checkbox"
            />
                {props.task.description}
                <br />
                {/* {((Object.values(props.users).length !== 0) && (props.task.assignedUser[0])) ? props.users[props.task.assignedUser[0]].firstName.concat(" ", props.users[props.task.assignedUser[0]].lastName) : null} */}
                {((Object.values(props.users).length !== 0) && (props.task.assignedUser[0])) ? allUsers() : null}
            </div>
            <button onClick={handleUpdate}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </li>
    )
}

const mapDispatchToProps = dispatch => ({
    deleteTask: (taskId) => dispatch(deleteTask(taskId)),
    updateTask: (task) => dispatch(updateTask(task)),
    openModal: (type) => dispatch(openModal(type))
})

export default connect(null, mapDispatchToProps)(TaskItem);